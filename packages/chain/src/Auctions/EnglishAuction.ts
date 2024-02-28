import { runtimeMethod, runtimeModule, state } from "@proto-kit/module";
import { StateMap, assert } from "@proto-kit/protocol";
import { Bool, Encoding, Poseidon, PublicKey, Struct, UInt64 } from "o1js";
import { inject } from "tsyringe";
import { NFT, NFTKey } from "../NFT";
import { Balances } from "../Balances";
import { AuctionModule, BaseAuctionData } from "./Auction";
import { GlobalCounter } from "../GlobalCounter";

export class Bids extends Struct({
  bidder: PublicKey,
  price: UInt64,
}) {}

export class EnglishAuction extends Struct({
  ...BaseAuctionData,
  startTime: UInt64,
  endTime: UInt64,
  maxBid: Bids,
}) {}

@runtimeModule()
export class EnglishAuctionModule extends AuctionModule<EnglishAuction> {
  public readonly ADDRESS = PublicKey.from({
    x: Poseidon.hash(Encoding.stringToFields("EnglishAuction")),
    isOdd: Bool(false),
  });

  public constructor(
    @inject("NFT") public nft: NFT,
    @inject("GlobalCounter") public counter: GlobalCounter,
    @inject("Balances") public balance: Balances
  ) {
    super(nft, counter);
    this.records = StateMap.from<UInt64, EnglishAuction>(
      UInt64,
      EnglishAuction
    );
  }

  /**
   * @param nftKey
   * @param duration `placeBid` possible in the next `duration` blocks
   */
  @runtimeMethod()
  public start(nftKey: NFTKey, duration: UInt64): UInt64 {
    // TODO is duration > buffer required
    const auction = new EnglishAuction({
      nftKey,
      creator: this.transaction.sender.value,
      winner: PublicKey.empty(),
      ended: Bool(false),
      startTime: this.network.block.height,
      endTime: this.network.block.height.add(duration),
      maxBid: new Bids({
        bidder: this.transaction.sender.value,
        price: UInt64.zero,
      }),
    });
    return this.createAuction(auction);
  }

  @runtimeMethod()
  public placeBid(auctionId: UInt64, bid: UInt64) {
    assert(this.records.get(auctionId).isSome, "no auctions exists");
    const auction = this.records.get(auctionId).value;
    const currentBid = new Bids({
      bidder: this.transaction.sender.value,
      price: bid,
    });
    assert(
      currentBid.price.greaterThan(auction.maxBid.price),
      "Bid must be higher than previous bid"
    );
    assert(
      auction.endTime
        .greaterThanOrEqual(this.network.block.height)
        .and(auction.ended.not()),
      "Auction has ended"
    );
    // lock bidders amount
    this.balance.transferFrom(this.transaction.sender.value, this.ADDRESS, bid);
    // we return the earlier bidders locked amount
    this.balance.transferFrom(
      this.ADDRESS,
      auction.maxBid.bidder,
      auction.maxBid.price
    );
    // update maxBids
    this.records.set(auctionId, { ...auction, maxBid: currentBid });
  }

  /**
   * Anyone can call this after auction endTime
   * maxBidder gets the nft and
   * auction creator gets the bid
   * @param nftKey
   */
  @runtimeMethod()
  public end(auctionId: UInt64) {
    assert(this.records.get(auctionId).isSome, "no auctions exists");
    const auction = this.records.get(auctionId).value;
    assert(
      auction.endTime
        .lessThan(this.network.block.height)
        .and(auction.ended.not()),
      "Wait till auction ends"
    );
    // transfer the locked token amount to seller or auction creator
    this.balance.transferFrom(
      this.ADDRESS,
      auction.creator,
      auction.maxBid.price
    );
    // end auction
    this.endAuction(auctionId, auction.maxBid.bidder);
  }
}
