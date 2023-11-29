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
  creator: Scalars['String']['output'];
  endTime?: Maybe<Scalars['Int']['output']>;
  ended: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  nft: Nft;
  startTime: Scalars['Int']['output'];
  type: AuctionType;
  winner?: Maybe<Scalars['String']['output']>;
};

export type AuctionType = DutchAuction | EnglishAuction;

export type Bid = {
  __typename?: 'Bid';
  amount: Scalars['Int']['output'];
  auction: Auction;
  bidder: Scalars['String']['output'];
  timestamp: Scalars['String']['output'];
};

export type Collection = {
  __typename?: 'Collection';
  address: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  nfts: Array<Nft>;
};

export type DutchAuction = {
  __typename?: 'DutchAuction';
  decayRate: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  minPrice: Scalars['Int']['output'];
  startPrice: Scalars['Int']['output'];
};

export type EnglishAuction = {
  __typename?: 'EnglishAuction';
  bidCount: Scalars['Int']['output'];
  bids: Array<Maybe<Bid>>;
  id: Scalars['ID']['output'];
  maxBid: Scalars['Int']['output'];
  maxBidder: Scalars['String']['output'];
};

export type Nft = {
  __typename?: 'NFT';
  collectionAddress: Scalars['String']['output'];
  data?: Maybe<Scalars['String']['output']>;
  dataHash: Scalars['String']['output'];
  idx: Scalars['Int']['output'];
  imgUrl?: Maybe<Scalars['String']['output']>;
  locked: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  owner: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  auction: Auction;
  auctions: Array<Auction>;
  collection: Collection;
  collections: Array<Collection>;
  nft: Nft;
  nfts: Array<Nft>;
  topBids: Array<Bid>;
  userBids: Array<Bid>;
};


export type QueryAuctionArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAuctionsArgs = {
  count?: InputMaybe<Scalars['Int']['input']>;
  creator?: InputMaybe<Scalars['String']['input']>;
  live?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCollectionArgs = {
  address: Scalars['String']['input'];
};


export type QueryCollectionsArgs = {
  count?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
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
  AuctionType: ( DutchAuction ) | ( EnglishAuction );
};


/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Auction: ResolverTypeWrapper<Omit<Auction, 'type'> & { type: ResolversTypes['AuctionType'] }>;
  AuctionType: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['AuctionType']>;
  Bid: ResolverTypeWrapper<Bid>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Collection: ResolverTypeWrapper<Collection>;
  DutchAuction: ResolverTypeWrapper<DutchAuction>;
  EnglishAuction: ResolverTypeWrapper<EnglishAuction>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  NFT: ResolverTypeWrapper<Nft>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Auction: Omit<Auction, 'type'> & { type: ResolversParentTypes['AuctionType'] };
  AuctionType: ResolversUnionTypes<ResolversParentTypes>['AuctionType'];
  Bid: Bid;
  Boolean: Scalars['Boolean']['output'];
  Collection: Collection;
  DutchAuction: DutchAuction;
  EnglishAuction: EnglishAuction;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  NFT: Nft;
  Query: {};
  String: Scalars['String']['output'];
};

export type AuctionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Auction'] = ResolversParentTypes['Auction']> = {
  creator?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  endTime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  ended?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  nft?: Resolver<ResolversTypes['NFT'], ParentType, ContextType>;
  startTime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['AuctionType'], ParentType, ContextType>;
  winner?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuctionTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuctionType'] = ResolversParentTypes['AuctionType']> = {
  __resolveType: TypeResolveFn<'DutchAuction' | 'EnglishAuction', ParentType, ContextType>;
};

export type BidResolvers<ContextType = any, ParentType extends ResolversParentTypes['Bid'] = ResolversParentTypes['Bid']> = {
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  auction?: Resolver<ResolversTypes['Auction'], ParentType, ContextType>;
  bidder?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Collection'] = ResolversParentTypes['Collection']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nfts?: Resolver<Array<ResolversTypes['NFT']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DutchAuctionResolvers<ContextType = any, ParentType extends ResolversParentTypes['DutchAuction'] = ResolversParentTypes['DutchAuction']> = {
  decayRate?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  minPrice?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  startPrice?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EnglishAuctionResolvers<ContextType = any, ParentType extends ResolversParentTypes['EnglishAuction'] = ResolversParentTypes['EnglishAuction']> = {
  bidCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  bids?: Resolver<Array<Maybe<ResolversTypes['Bid']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  maxBid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  maxBidder?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NftResolvers<ContextType = any, ParentType extends ResolversParentTypes['NFT'] = ResolversParentTypes['NFT']> = {
  collectionAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dataHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  idx?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  imgUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  locked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  auction?: Resolver<ResolversTypes['Auction'], ParentType, ContextType, Partial<QueryAuctionArgs>>;
  auctions?: Resolver<Array<ResolversTypes['Auction']>, ParentType, ContextType, Partial<QueryAuctionsArgs>>;
  collection?: Resolver<ResolversTypes['Collection'], ParentType, ContextType, RequireFields<QueryCollectionArgs, 'address'>>;
  collections?: Resolver<Array<ResolversTypes['Collection']>, ParentType, ContextType, Partial<QueryCollectionsArgs>>;
  nft?: Resolver<ResolversTypes['NFT'], ParentType, ContextType, RequireFields<QueryNftArgs, 'collection' | 'idx'>>;
  nfts?: Resolver<Array<ResolversTypes['NFT']>, ParentType, ContextType, Partial<QueryNftsArgs>>;
  topBids?: Resolver<Array<ResolversTypes['Bid']>, ParentType, ContextType, Partial<QueryTopBidsArgs>>;
  userBids?: Resolver<Array<ResolversTypes['Bid']>, ParentType, ContextType, RequireFields<QueryUserBidsArgs, 'address'>>;
};

export type Resolvers<ContextType = any> = {
  Auction?: AuctionResolvers<ContextType>;
  AuctionType?: AuctionTypeResolvers<ContextType>;
  Bid?: BidResolvers<ContextType>;
  Collection?: CollectionResolvers<ContextType>;
  DutchAuction?: DutchAuctionResolvers<ContextType>;
  EnglishAuction?: EnglishAuctionResolvers<ContextType>;
  NFT?: NftResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

