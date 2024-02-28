import {
  runtimeMethod,
  runtimeModule,
  RuntimeModule,
  state,
} from "@proto-kit/module";
import { StateMap, assert } from "@proto-kit/protocol";
import { Bool, Field, PublicKey, Struct, UInt32 } from "o1js";

export class NFTKey extends Struct({
  collection: PublicKey,
  id: UInt32,
}) {
  public static from(collection: PublicKey, id: UInt32) {
    return new NFTKey({ collection, id });
  }
}

export class NFTEntity extends Struct({
  owner: PublicKey,
  metadata: Field, // ipfs hash
  locked: Bool,
}) {}

@runtimeModule()
export class NFT extends RuntimeModule<{}> {
  @state() public nftRecords = StateMap.from<NFTKey, NFTEntity>(
    NFTKey,
    NFTEntity
  );
  @state() public nonces = StateMap.from<PublicKey, UInt32>(PublicKey, UInt32);

  @runtimeMethod()
  public mint(to: PublicKey, metadata: Field) {
    const minter = this.transaction.sender.value;
    const minterNonce = this.nonces.get(minter).value;
    const key = NFTKey.from(minter, minterNonce);
    this.nftRecords.set(
      key,
      new NFTEntity({ owner: to, metadata, locked: Bool(false) })
    );
    this.nonces.set(minter, minterNonce.add(1));
  }

  @runtimeMethod()
  public transferSigned(to: PublicKey, nftKey: NFTKey) {
    assert(this.nftRecords.get(nftKey).isSome, "nft does not exists");
    const nft = this.nftRecords.get(nftKey).value;
    // check if sender is the current owner
    assert(nft.owner.equals(this.transaction.sender.value), "Not owner of NFT");
    // check if the NFT is locked
    assert(nft.locked.not(), "NFT is locked and cannot be transferred");
    this.transfer(to, nftKey);
  }

  public transfer(to: PublicKey, key: NFTKey) {
    const nft = this.nftRecords.get(key).value;
    // update the owner to the 'to' address
    this.nftRecords.set(
      key,
      new NFTEntity({ owner: to, metadata: nft.metadata, locked: Bool(false) })
    );
    // nft.owner = to;
    // this.nftRecords.set(key, nft);
  }

  public lock(key: NFTKey) {
    const nft = this.nftRecords.get(key).value;
    // lock the nft
    this.nftRecords.set(key, new NFTEntity({ ...nft, locked: Bool(true) }));
  }

  public unlock(key: NFTKey) {
    const nft = this.nftRecords.get(key).value;
    // lock the nft
    this.nftRecords.set(key, new NFTEntity({ ...nft, locked: Bool(false) }));
  }

  public assertLocked(key: NFTKey) {
    const nft = this.nftRecords.get(key).value;
    assert(nft.locked, "NFT is not locked");
  }

  public assertUnLocked(key: NFTKey) {
    const nft = this.nftRecords.get(key).value;
    assert(nft.locked.not(), "NFT is locked");
  }

  public assertAddressOwner(key: NFTKey, address: PublicKey) {
    const nft = this.nftRecords.get(key).value;
    // console.log(
    //   "is owner",
    //   address.toBase58().substring(0, 8),
    //   nft.owner.equals(address).toBoolean()
    // );
    assert(nft.owner.equals(address), "Not owner of NFT");
  }
}
