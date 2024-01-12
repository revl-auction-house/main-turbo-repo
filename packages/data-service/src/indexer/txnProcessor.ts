import { ComputedTransactionJSON } from "./types";
import * as dotenv from "dotenv";
import { DataSource } from "../dataSource";
import {
  AuctionPart,
  NftPart,
  CollectionPart,
  EnglishAuctionPart,
  BlindFirstPriceAuctionPart,
} from "../dataSource/types";
import { DutchAuction } from "../resolvers/resolvers-types";
import { addTask, endAuction } from "./indexerJob";
import { getMethodId } from "./helpers";

export class TxnProcessor {
  private processors: {
    [key: string]: (
      data: ComputedTransactionJSON,
      blockHeight: number
    ) => Promise<void>;
  };
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    dotenv.config();
    this.processors = {};
    this.dataSource = dataSource;
  }

  public async init() {
    this.processors[getMethodId("Balances", "addBalance")] = async (data) => {
      const [address, amount] = data.argsJSON.map((arg: string) =>
        JSON.parse(arg)
      );
      console.log("addBalance", address, amount);
    };
    this.processors[getMethodId("Balances", "transfer")] = async (data) => {
      console.log(data);
    };

    /** NFT */
    this.processors[getMethodId("NFT", "mint")] = async (data) => {
      const [to, hash] = data.argsJSON.map((arg: string) => JSON.parse(arg));
      // console.log("minting: ", to, hash);
      const collectionAddr = data.sender;
      const nftData = await this.dataSource.getValue(hash);
      // console.log("nftData", nftData);
      if (nftData) {
        const nftCount = await this.dataSource.getNftCount(collectionAddr);
        console.log("nftCount", nftCount);
        // remove las word from nftData.name
        if (nftCount === 0) {
          const collectionData: CollectionPart = {
            address: collectionAddr,
            liveAuctionCount: 0,
            name:
              nftData.collectionName ||
              nftData.name?.split(" ").slice(0, -1).join(" ") ||
              "",
            description:
              nftData.collectionDescription || nftData.description || "",
          };
          await this.dataSource.createCollection(
            collectionAddr,
            collectionData
          );
          console.log("created Collection", collectionData.name);
        }
        await this.dataSource.createNFT(collectionAddr, nftCount, {
          name: nftData.name || nftData.title || "",
          imgUrl:
            nftData.img || nftData.imgUri || nftData.image || nftData.imageUri,
          dataHash: hash,
          idx: nftCount,
          locked: false,
          owner: to,
          collectionAddress: collectionAddr,
        });
        console.log("created Nft: ", nftData.name || nftData.title);
      } else {
        console.warn("nft data not found for hash: ", hash);
      }
    };
    this.processors[getMethodId("NFT", "transferSigned")] = async (data) => {
      const [to, nftKey] = data.argsJSON.map((arg: string) => JSON.parse(arg));
      // console.log("transferSigned", to, nftKey);
      this.dataSource.updateNFT(nftKey.collection, Number(nftKey.id), {
        owner: to,
      });
      console.log(nftKey);
    };

    /** DutchAuction */
    this.processors[getMethodId("DutchAuctionModule", "start")] = async (
      data,
      blockHeight
    ) => {
      const [nftKey, startPrice, decayRate, minPrice] = data.argsJSON.map(
        (arg: string) => JSON.parse(arg)
      );
      let auctionId = await this.dataSource.getAuctionCount();
      const creator = data.sender;
      console.log("start Dutch Auc", nftKey, nftKey.id);
      const auction: AuctionPart = {
        id: auctionId.toString(),
        collectionAddress: nftKey.collection,
        nftIdx: Number(nftKey.id),
        auctionType: "dutch",
        auctionData: {
          id: auctionId.toString(),
          startPrice,
          decayRate,
          minPrice,
        },
        creator,
        ended: false,
        startTime: blockHeight.toString(),
      };
      this.dataSource.createAuction(auctionId.toString(), auction);
      // update nft
      this.dataSource.updateNFT(nftKey.collection, Number(nftKey.id), {
        locked: true,
        latestAuctionId: auctionId.toString(),
      });
      // update collection
      this.dataSource.incrementCollectionMetrics(nftKey.collection, {
        liveAuctionCount: 1,
      });
    };
    this.processors[getMethodId("DutchAuctionModule", "bid")] = async (
      data,
      blockHeight
    ) => {
      const [auctionId] = data.argsJSON.map((arg: string) => JSON.parse(arg));
      const bidder = data.sender;
      // update auction
      const auc = await this.dataSource.getAuction(auctionId);
      const aucData = auc?.auctionData as DutchAuction;
      const bid =
        BigInt(aucData.startPrice) -
        BigInt(aucData.decayRate) *
          BigInt(blockHeight - Number(auc?.startTime));
      const minBid = BigInt(aucData.minPrice);
      const finalBid = bid < minBid ? minBid : bid;

      this.dataSource.updateAuction(auctionId, {
        ended: true,
        winningBid: {
          auctionId: auctionId,
          amount: finalBid.toString(),
          bidder,
          timestamp: Date.now().toString(),
        },
      });
      // create Bid
      this.dataSource.createBid(auctionId, bidder, finalBid.toString());
      // update nft
      this.dataSource.updateNFT(auc?.collectionAddress!, auc?.nftIdx!, {
        locked: false,
        owner: bidder,
      });
      // update collection
      // TODO update floor, volume etc
      this.dataSource.incrementCollectionMetrics(auc?.collectionAddress!, {
        liveAuctionCount: -1,
      });
    };

    /** EnglishAuction */
    this.processors[getMethodId("EnglishAuctionModule", "start")] = async (
      data,
      blockHeight
    ) => {
      const [nftKey, durationStr] = data.argsJSON.map((arg: string) =>
        JSON.parse(arg)
      );
      let auctionId = await this.dataSource.getAuctionCount();
      const creator = data.sender;
      console.log("start Eng Auc", nftKey, durationStr);
      const auction: AuctionPart = {
        id: auctionId.toString(),
        collectionAddress: nftKey.collection,
        nftIdx: Number(nftKey.id),
        auctionType: "english",
        auctionData: {
          id: auctionId.toString(),
          bidCount: 0,
          endTime: "" + (blockHeight + Number(durationStr)),
        },
        creator,
        ended: false,
        startTime: blockHeight.toString(),
      };
      this.dataSource.createAuction(auctionId.toString(), auction);
      // update nft
      this.dataSource.updateNFT(nftKey.collection, Number(nftKey.id), {
        locked: true,
        latestAuctionId: auctionId.toString(),
      });
      // update collection
      this.dataSource.incrementCollectionMetrics(nftKey.collection, {
        liveAuctionCount: 1,
      });

      // TODO move logic to hooks
      addTask(blockHeight + Number(durationStr), async () => {
        await endAuction(auctionId);
      });
    };
    this.processors[getMethodId("EnglishAuctionModule", "placeBid")] = async (
      data: ComputedTransactionJSON
    ) => {
      const [auctionId, bid] = data.argsJSON.map((arg: string) =>
        JSON.parse(arg)
      );
      const bidder = data.sender;
      // update auction
      const aucData = (await this.dataSource.getAuction(auctionId))
        ?.auctionData as EnglishAuctionPart;
      console.log("Eng Auc bid", aucData);
      this.dataSource.updateAuction(auctionId, {
        auctionData: {
          ...aucData,
          bidCount: aucData.bidCount + 1,
        },
        winningBid: {
          auctionId,
          amount: bid,
          bidder,
          timestamp: Date.now().toString(),
        },
      });
      // create Bid
      this.dataSource.createBid(auctionId, bidder, bid);
    };
    this.processors[getMethodId("EnglishAuctionModule", "end")] = async (
      data: ComputedTransactionJSON
    ) => {
      // console.log(data);
      const [auctionId] = data.argsJSON.map((arg: string) => JSON.parse(arg));
      const auc = await this.dataSource.getAuction(auctionId);
      this.dataSource.updateAuction(auctionId, {
        ended: true,
      });
      // update nft
      this.dataSource.updateNFT(auc?.collectionAddress!, auc?.nftIdx!, {
        locked: false,
        owner: auc?.winningBid?.bidder,
      });
      // update collection
      // TODO update floor, volume etc
      this.dataSource.incrementCollectionMetrics(auc?.collectionAddress!, {
        liveAuctionCount: -1,
      });
    };
    /** Blind Auction 1st Price */
    this.processors[getMethodId("BlindFirstPriceAuctionModule", "start")] =
      async (data, blockHeight) => {
        const [nftKey, biddingWindow, revealWindow] = data.argsJSON.map(
          (arg: string) => JSON.parse(arg)
        );
        console.log(data);
        let auctionId = await this.dataSource.getAuctionCount();
        const creator = data.sender;
        console.log("start Blind 1st Price Auc", nftKey, nftKey.id);
        const auction: AuctionPart = {
          id: auctionId.toString(),
          collectionAddress: nftKey.collection,
          nftIdx: Number(nftKey.id),
          auctionType: "blindFirstPrice",
          auctionData: {
            id: auctionId.toString(),
            revealTime: "" + (blockHeight + Number(biddingWindow)),
            endTime:
              "" + (blockHeight + Number(biddingWindow) + Number(revealWindow)),
            sealedBidCount: 0,
            revealedBidCount: 0,
          },
          creator,
          ended: false,
          startTime: blockHeight.toString(),
        };
        this.dataSource.createAuction(auctionId.toString(), auction);
        // update nft
        this.dataSource.updateNFT(nftKey.collection, Number(nftKey.id), {
          locked: true,
          latestAuctionId: auctionId.toString(),
        });
        // update collection
        this.dataSource.incrementCollectionMetrics(nftKey.collection, {
          liveAuctionCount: 1,
        });
      };
    this.processors[
      getMethodId("BlindFirstPriceAuctionModule", "placeSealedBid")
    ] = async (data) => {
      const [auctionId, sealedBidProof] = data.argsJSON.map((arg: string) =>
        JSON.parse(arg)
      );
      console.log(auctionId, sealedBidProof);
      // update sealedBidCount with 1
      const aucData = (await this.dataSource.getAuction(auctionId))
        ?.auctionData as BlindFirstPriceAuctionPart;
      this.dataSource.updateAuction(auctionId, {
        auctionData: {
          ...aucData,
          sealedBidCount: aucData.sealedBidCount + 1,
        },
      });
    };
    this.processors[getMethodId("BlindFirstPriceAuctionModule", "revealBid")] =
      async (data) => {
        const [revealBidProof] = data.argsJSON.map((arg: string) =>
          JSON.parse(arg)
        );
        console.log(revealBidProof);
        // update Auction
        const aucData = (
          await this.dataSource.getAuction(revealBidProof.auctionId)
        )?.auctionData as BlindFirstPriceAuctionPart;
        this.dataSource.updateAuction(revealBidProof.auctionId, {
          // TODO wining Bid
          auctionData: {
            ...aucData,
            revealedBidCount: aucData.revealedBidCount + 1,
          },
        });
        // TODO update bids
        // this.dataSource.createBid(revealBidProof.auctionId, bidder, bid);
      };
    this.processors[getMethodId("BlindFirstPriceAuctionModule", "settle")] =
      async (data) => {
        const [auctionId] = data.argsJSON.map((arg: string) => JSON.parse(arg));
        const auc = await this.dataSource.getAuction(auctionId);
        this.dataSource.updateAuction(auctionId, {
          ended: true,
        });
        // update nft
        this.dataSource.updateNFT(auc?.collectionAddress!, auc?.nftIdx!, {
          locked: false,
          owner: auc?.winningBid?.bidder,
        });
        // update collection
        // TODO update floor, volume etc
        this.dataSource.incrementCollectionMetrics(auc?.collectionAddress!, {
          liveAuctionCount: -1,
        });
      };
    // TODO Blind Second Price
    return this;
  }

  public processTransaction(
    methodId: string,
    data: ComputedTransactionJSON,
    blockHeight: number
  ) {
    const processor = this.processors[methodId];
    if (processor) {
      processor(data, blockHeight);
    } else {
      console.log(`skiping tx with methodId: ${methodId}`);
    }
  }
}
