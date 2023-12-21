/**
 * Only for testing purposes, this file generates random data
 */
import type {
	Auction,
	EnglishAuction,
	DutchAuction,
	BlindAuction,
	BlindSecondHighestAuction,
	Bid,
	Collection,
	Nft,
	AuctionType
} from './api';

const hr = 1000 * 60 * 60;
const gNumber = () => {
	return Number((Math.random() * 10).toFixed(3));
};
const gFraction = () => {
	return Number(Math.random().toFixed(3));
};
const gInt = () => {
	return Math.floor(Math.random() * 10000);
};
const gLorem = () => {
	const lorem =
		'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum';
	const words = lorem.split(' ');
	return words[Math.floor(Math.random() * words.length)];
};
const gAddress = () => {
	return Array.from({ length: 55 }, () => Math.floor(Math.random() * 32).toString(32)).join('');
};
const gHex = (length?: number) => {
	return Array.from({ length: length || 32 }, () =>
		Math.floor(Math.random() * 16).toString(16)
	).join('');
};
const gTime = () => {
	return Date.now() + hr * Math.random();
};
const gImgAddress = () => {
	const images = [
		'https://th.bing.com/th/id/OIP.Z0PLkCGpEDNcan8n3m-OIAHaFk?rs=1&pid=ImgDetMain',
		'https://i.seadn.io/s/raw/files/84a9e8ded899637720c648315394a0d5.png?auto=format&dpr=1&w=384',
		'https://i.seadn.io/s/raw/files/37655e8f1d5a26f91070f4f01ac5d463.png?auto=format&dpr=1&w=512',
		'https://i.seadn.io/s/raw/files/ec33991c9abfb25f7ec2ff1cec1d34b9.png?auto=format&dpr=1&w=327',
		'https://i.seadn.io/s/raw/files/3df4367fbc09d35bb2922fe1aae9ebac.png?auto=format&dpr=1&w=327',
		'https://i.seadn.io/s/raw/files/2fe42456bea313a4c6715b3028d9d8f1.png?auto=format&dpr=1&w=327',
		'https://i.seadn.io/s/raw/files/4bc38af0fbb32ae64468206c20a8d28e.png?auto=format&dpr=1&w=327',
		'https://i.seadn.io/s/raw/files/565f95f2393e71a0f9292d2773147fe9.png?auto=format&dpr=1&w=327',
		'https://i.seadn.io/s/raw/files/8d7b09fc55fc12fd60202208ce151a2e.png?auto=format&dpr=1&w=327',
		'https://i.seadn.io/s/raw/files/86bb7943b349790a966545957a990157.png?auto=format&dpr=1&w=327',
		'https://i.seadn.io/s/raw/files/78fc7d03c55f29f2365d944a591e469f.png?auto=format&dpr=1&w=327',
		'https://i.seadn.io/gae/bsILA43I-z1ZdcHFAdLE-IOOUfk8ma8e_F4GTyxgT_HpXNYOV3OP7pqhberrvjuXYv1BXWU-7A-U-wKT2tpukngnMQEggxcSZRn2-w?auto=format&dpr=1&w=327',
		'https://i.seadn.io/gae/Q9yJQuu-fvU5o2APNOvT-jgjdbE2s2uz3ekWM--Rq4AAJI3a9Mj9XgvGJs_aVkiQM9_7g_O1fFBDuue_F_axthobeE5M2Qpt7v6v?auto=format&dpr=1&w=327',
		'https://i.seadn.io/gae/oH7EIXQEf6pd5X02Hsdmr9bGL4JJeb6FuBrFDq30j1JVXNv6v6Ykdp9VMQfadoo5WZb3XUQ12-doLlBdlNlWBI_9wUvID-AEQVeQ?auto=format&dpr=1&w=327',
		'https://i.seadn.io/gae/X612Bf0yzcWM-LeGali3ucSk42-FW-ItsAaAe4XWFPcyVHyPlHQLlrZuxqLADDLGb2z-SA-h1UZs3kBDXK8bEaHfukMVaW0772Yi-w?auto=format&dpr=1&w=327',
		'https://i.seadn.io/s/raw/files/4287f2552cda61304e4f7042353780db.png?auto=format&dpr=1&w=327',
		'https://i.seadn.io/gcs/files/7943580aa7b09ce5a4df2c4bb8069ce0.png?auto=format&dpr=1&w=327',
		'https://i.seadn.io/gcs/files/f3ada3567d9fc15a51e8e5e4ad479b87.png?auto=format&dpr=1&w=327'
	];
	return images[Math.floor(Math.random() * images.length)];
};
const gNfts = () => {
	const nft: Nft = {
		typename: 'Nft',
		collectionAddress: gAddress(),
		idx: gInt(),
		name: gLorem(),
		imgUrl: gImgAddress(),
		owner: gAddress(),
		dataHash: gHex(),
		locked: false
	};
	return nft;
};
const gCollection = () => {
	const collection: Collection = {
		typename: 'Collection',
		address: gAddress(),
		name: gLorem(),
		floorPrice: gNumber(),
		description: gHex(),
		nfts: Array.from({ length: 10 }, gNfts)
	};
	return collection;
};
const gAuctionType = () => {
	const auctionTypes = [gEnglishAuction, gDutchAuction, gBlindAuction, gBlindSecondHighestAuction];
	const roll = Math.floor(Math.random() * auctionTypes.length);
	const auctionType: AuctionType = auctionTypes[roll]();
	return auctionType;
};
const gEnglishAuction = () => {
	const auction: EnglishAuction = {
		typename: 'EnglishAuction',
		id: gInt(),
		maxBidder: gHex(32),
		maxBid: gNumber(),
		bidCount: gInt(),
		bids: [],
		endTime: gTime() + hr * 10
	};
	return auction;
};
const gDutchAuction = () => {
	const auction: DutchAuction = {
		typename: 'DutchAuction',
		id: gInt(),
		startPrice: gNumber(),
		decayRate: gFraction(),
		minPrice: gNumber()
	};
	return auction;
};
const gBlindAuction = () => {
	const auction: BlindAuction = {
		typename: 'BlindAuction',
		id: gInt(),
		revealTime: gTime() + hr,
		bidCount: gInt(),
		endTime: gTime() + hr * 10
	};
	return auction;
};
const gBlindSecondHighestAuction = () => {
	const auction: BlindSecondHighestAuction = {
		typename: 'BlindSecondHighestAuction',
		id: gInt(),
		revealTime: gTime() + hr * 5,
		bidCount: gInt(),
		endTime: gTime() + hr * 10
	};
	return auction;
};
const gAuction = () => {
	return {
		typename: 'Auction',
		id: gInt(),
		nft: gNfts(),
		creator: gAddress(),
		startTime: gTime() - hr,
		ended: false,
		winner: gHex(),
		type: gAuctionType()
	} as Auction;
};
const gBid = () => {
	const bid: Bid = {
		typename: 'Bid',
		auction: gAuction(),
		bidder: gHex(),
		amount: gNumber(),
		timestamp: gHex()
	};
	return bid;
};

const count = 20;

export const Nfts: Array<Nft> = Array.from({ length: count }, gNfts);

export const Collections: Array<Collection> = Array.from({ length: count }, gCollection);

export const Auctions: Array<Auction> = Array.from({ length: count }, gAuction);

export const Bids: Array<Bid> = Array.from({ length: count }, gBid);
