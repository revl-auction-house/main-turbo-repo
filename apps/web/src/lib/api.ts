// /**
//  * Only for testing purposes, this file generates random data
//  */
// export type Nft = {
// 	typename: 'Nft';
// 	collectionAddress: string;
// 	idx: number;
// 	owner: string;
// 	dataHash: string;
// 	locked: boolean;
// 	data?: string;
// 	name: string;
// 	imgUrl?: string;
// };

// export type Collection = {
// 	typename: 'Collection';
// 	address: string;
// 	name: string;
// 	floorPrice?: number;
// 	description?: string;
// 	nfts: Array<Nft>;
// };

// export type AuctionType = EnglishAuction | DutchAuction | BlindAuction | BlindSecondHighestAuction;

// export type Auction = {
// 	typename: 'Auction';
// 	id: number;
// 	nft: Nft;
// 	creator: string;
// 	startTime: number;
// 	ended: boolean;
// 	winner?: string;
// 	type: AuctionType;
// };

// export type EnglishAuction = {
// 	typename: 'EnglishAuction';
// 	id: number;
// 	maxBidder: string;
// 	maxBid: number;
// 	bidCount: number;
// 	bids: Array<Bid>;
// 	endTime: number;
// };

// /**
//  * Dutch Auctions are auctions where the price starts high and decreases over time.
//  *
//  * The auction never ends, the price decreases to a minimum and stays there.
//  *
//  * The first bidder wins.
//  */
// export type DutchAuction = {
// 	typename: 'DutchAuction';
// 	id: number;
// 	startPrice: number;
// 	decayRate: number;
// 	minPrice: number;
// };

// /**
//  * Blind Auctions are auctions where the bids are hidden.
//  *
//  * There are 2 phases, the bidding phase and the reveal phase.
//  *
//  * During the bidding phase, bidders submit their bids.
//  *
//  * During the reveal phase, bidders reveal their bids.
//  *
//  * The auction ends at a specific time and the highest bidder wins.
//  */
// export type BlindAuction = {
// 	typename: 'BlindAuction';
// 	id: number;
// 	bidCount: number;
// 	revealTime: number;
// 	bids?: Array<Bid>;
// 	endTime: number;
// };

// /**
//  * Blind Auctions are auctions where the bids are hidden.
//  *
//  * This is a variant of the Blind Auction the winner is the highest bidder but he pays the second highest bid.
//  */
// export type BlindSecondHighestAuction = {
// 	typename: 'BlindSecondHighestAuction';
// 	id: number;
// 	bidCount: number;
// 	revealTime: number;
// 	bids?: Array<Bid>;
// 	endTime: number;
// };

// export type Bid = {
// 	typename: 'Bid';
// 	auction: Auction;
// 	bidder: string;
// 	amount: number;
// 	timestamp: string;
// };

// export type Query = {
// 	nfts: Array<Nft>;
// 	nft: Nft;
// 	collections: Array<Collection>;
// 	collection: Collection;
// 	auctions: Array<Auction>;
// 	auction: Auction;
// 	topBids: Array<Bid>;
// 	userBids: Array<Bid>;
// };

// export type QueryNftsArgs = {
// 	owner?: string;
// 	collection?: string;
// 	skip?: number;
// 	count?: number;
// };

// export type QueryNftArgs = {
// 	collection: string;
// 	idx: number;
// };

// export type QueryCollectionsArgs = {
// 	skip?: number;
// 	count?: number;
// };

// export type QueryCollectionArgs = {
// 	address: string;
// };

// export type QueryAuctionsArgs = {
// 	creator?: string;
// 	live?: boolean;
// 	skip?: number;
// 	count?: number;
// };

// export type QueryAuctionArgs = {
// 	id?: string;
// };

// export type QueryTopBidsArgs = {
// 	skip?: number;
// 	count?: number;
// };

// export type QueryUserBidsArgs = {
// 	address: string;
// 	skip?: number;
// 	count?: number;
// };
