import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Auction = {
  __typename?: 'Auction';
  auctionData?: Maybe<AuctionType>;
  auctionType: Scalars['String']['output'];
  creator: Scalars['String']['output'];
  ended: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  nft: Nft;
  startTime: Scalars['String']['output'];
  winningBid?: Maybe<Bid>;
};

export type AuctionType = BlindFirstPriceAuction | BlindSecondPriceAuction | DutchAuction | EnglishAuction;

export type Bid = {
  __typename?: 'Bid';
  amount: Scalars['String']['output'];
  auction: Auction;
  bidder: Scalars['String']['output'];
  timestamp: Scalars['String']['output'];
};

export type BlindFirstPriceAuction = {
  __typename?: 'BlindFirstPriceAuction';
  bids: Array<Bid>;
  endTime: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  revealTime: Scalars['String']['output'];
  revealedBidCount: Scalars['Int']['output'];
  sealedBidCount: Scalars['Int']['output'];
};

export type BlindSecondPriceAuction = {
  __typename?: 'BlindSecondPriceAuction';
  bids: Array<Bid>;
  endTime: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  revealTime: Scalars['String']['output'];
  revealedBidCount: Scalars['Int']['output'];
  sealedBidCount: Scalars['Int']['output'];
};

export type Collection = {
  __typename?: 'Collection';
  address: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  floorPrice?: Maybe<Scalars['String']['output']>;
  liveAuctionCount: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  nfts: Array<Nft>;
  volume?: Maybe<Scalars['String']['output']>;
};

export type DutchAuction = {
  __typename?: 'DutchAuction';
  decayRate: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  minPrice: Scalars['String']['output'];
  startPrice: Scalars['String']['output'];
};

export type EnglishAuction = {
  __typename?: 'EnglishAuction';
  bidCount: Scalars['Int']['output'];
  bids: Array<Bid>;
  endTime: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  setKeyValue?: Maybe<Scalars['String']['output']>;
};


export type MutationSetKeyValueArgs = {
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type Nft = {
  __typename?: 'NFT';
  collection: Collection;
  data?: Maybe<Scalars['String']['output']>;
  dataHash: Scalars['String']['output'];
  idx: Scalars['Int']['output'];
  imgUrl?: Maybe<Scalars['String']['output']>;
  latestAuctionId?: Maybe<Scalars['ID']['output']>;
  locked: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  owner: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  auction?: Maybe<Auction>;
  auctions: Array<Auction>;
  collection?: Maybe<Collection>;
  collections: Array<Collection>;
  getValue?: Maybe<Scalars['String']['output']>;
  nft?: Maybe<Nft>;
  nfts: Array<Nft>;
  topBids: Array<Bid>;
  userBids: Array<Bid>;
};


export type QueryAuctionArgs = {
  id: Scalars['String']['input'];
};


export type QueryAuctionsArgs = {
  count?: InputMaybe<Scalars['Int']['input']>;
  creator?: InputMaybe<Scalars['String']['input']>;
  onlyLive?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCollectionArgs = {
  address: Scalars['String']['input'];
};


export type QueryCollectionsArgs = {
  count?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetValueArgs = {
  key: Scalars['String']['input'];
};


export type QueryNftArgs = {
  collection: Scalars['String']['input'];
  idx: Scalars['Int']['input'];
};


export type QueryNftsArgs = {
  collection?: InputMaybe<Scalars['String']['input']>;
  count?: InputMaybe<Scalars['Int']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTopBidsArgs = {
  count?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserBidsArgs = {
  address: Scalars['String']['input'];
  count?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<RefType extends Record<string, unknown>> = {
  AuctionType: ( BlindFirstPriceAuction ) | ( BlindSecondPriceAuction ) | ( DutchAuction ) | ( EnglishAuction );
};


/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Auction: ResolverTypeWrapper<Omit<Auction, 'auctionData'> & { auctionData?: Maybe<ResolversTypes['AuctionType']> }>;
  AuctionType: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['AuctionType']>;
  Bid: ResolverTypeWrapper<Bid>;
  BlindFirstPriceAuction: ResolverTypeWrapper<BlindFirstPriceAuction>;
  BlindSecondPriceAuction: ResolverTypeWrapper<BlindSecondPriceAuction>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Collection: ResolverTypeWrapper<Collection>;
  DutchAuction: ResolverTypeWrapper<DutchAuction>;
  EnglishAuction: ResolverTypeWrapper<EnglishAuction>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  NFT: ResolverTypeWrapper<Nft>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Auction: Omit<Auction, 'auctionData'> & { auctionData?: Maybe<ResolversParentTypes['AuctionType']> };
  AuctionType: ResolversUnionTypes<ResolversParentTypes>['AuctionType'];
  Bid: Bid;
  BlindFirstPriceAuction: BlindFirstPriceAuction;
  BlindSecondPriceAuction: BlindSecondPriceAuction;
  Boolean: Scalars['Boolean']['output'];
  Collection: Collection;
  DutchAuction: DutchAuction;
  EnglishAuction: EnglishAuction;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  NFT: Nft;
  Query: {};
  String: Scalars['String']['output'];
};

export type AuctionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Auction'] = ResolversParentTypes['Auction']> = {
  auctionData?: Resolver<Maybe<ResolversTypes['AuctionType']>, ParentType, ContextType>;
  auctionType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ended?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  nft?: Resolver<ResolversTypes['NFT'], ParentType, ContextType>;
  startTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  winningBid?: Resolver<Maybe<ResolversTypes['Bid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuctionTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuctionType'] = ResolversParentTypes['AuctionType']> = {
  __resolveType: TypeResolveFn<'BlindFirstPriceAuction' | 'BlindSecondPriceAuction' | 'DutchAuction' | 'EnglishAuction', ParentType, ContextType>;
};

export type BidResolvers<ContextType = any, ParentType extends ResolversParentTypes['Bid'] = ResolversParentTypes['Bid']> = {
  amount?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  auction?: Resolver<ResolversTypes['Auction'], ParentType, ContextType>;
  bidder?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BlindFirstPriceAuctionResolvers<ContextType = any, ParentType extends ResolversParentTypes['BlindFirstPriceAuction'] = ResolversParentTypes['BlindFirstPriceAuction']> = {
  bids?: Resolver<Array<ResolversTypes['Bid']>, ParentType, ContextType>;
  endTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  revealTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  revealedBidCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sealedBidCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BlindSecondPriceAuctionResolvers<ContextType = any, ParentType extends ResolversParentTypes['BlindSecondPriceAuction'] = ResolversParentTypes['BlindSecondPriceAuction']> = {
  bids?: Resolver<Array<ResolversTypes['Bid']>, ParentType, ContextType>;
  endTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  revealTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  revealedBidCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sealedBidCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Collection'] = ResolversParentTypes['Collection']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  floorPrice?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  liveAuctionCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nfts?: Resolver<Array<ResolversTypes['NFT']>, ParentType, ContextType>;
  volume?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DutchAuctionResolvers<ContextType = any, ParentType extends ResolversParentTypes['DutchAuction'] = ResolversParentTypes['DutchAuction']> = {
  decayRate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  minPrice?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  startPrice?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EnglishAuctionResolvers<ContextType = any, ParentType extends ResolversParentTypes['EnglishAuction'] = ResolversParentTypes['EnglishAuction']> = {
  bidCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  bids?: Resolver<Array<ResolversTypes['Bid']>, ParentType, ContextType>;
  endTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  setKeyValue?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationSetKeyValueArgs, 'key' | 'value'>>;
};

export type NftResolvers<ContextType = any, ParentType extends ResolversParentTypes['NFT'] = ResolversParentTypes['NFT']> = {
  collection?: Resolver<ResolversTypes['Collection'], ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dataHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  idx?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  imgUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  latestAuctionId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  locked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  auction?: Resolver<Maybe<ResolversTypes['Auction']>, ParentType, ContextType, RequireFields<QueryAuctionArgs, 'id'>>;
  auctions?: Resolver<Array<ResolversTypes['Auction']>, ParentType, ContextType, Partial<QueryAuctionsArgs>>;
  collection?: Resolver<Maybe<ResolversTypes['Collection']>, ParentType, ContextType, RequireFields<QueryCollectionArgs, 'address'>>;
  collections?: Resolver<Array<ResolversTypes['Collection']>, ParentType, ContextType, Partial<QueryCollectionsArgs>>;
  getValue?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QueryGetValueArgs, 'key'>>;
  nft?: Resolver<Maybe<ResolversTypes['NFT']>, ParentType, ContextType, RequireFields<QueryNftArgs, 'collection' | 'idx'>>;
  nfts?: Resolver<Array<ResolversTypes['NFT']>, ParentType, ContextType, Partial<QueryNftsArgs>>;
  topBids?: Resolver<Array<ResolversTypes['Bid']>, ParentType, ContextType, Partial<QueryTopBidsArgs>>;
  userBids?: Resolver<Array<ResolversTypes['Bid']>, ParentType, ContextType, RequireFields<QueryUserBidsArgs, 'address'>>;
};

export type Resolvers<ContextType = any> = {
  Auction?: AuctionResolvers<ContextType>;
  AuctionType?: AuctionTypeResolvers<ContextType>;
  Bid?: BidResolvers<ContextType>;
  BlindFirstPriceAuction?: BlindFirstPriceAuctionResolvers<ContextType>;
  BlindSecondPriceAuction?: BlindSecondPriceAuctionResolvers<ContextType>;
  Collection?: CollectionResolvers<ContextType>;
  DutchAuction?: DutchAuctionResolvers<ContextType>;
  EnglishAuction?: EnglishAuctionResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NFT?: NftResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

