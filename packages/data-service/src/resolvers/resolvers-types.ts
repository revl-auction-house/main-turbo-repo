import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Collection = {
  __typename?: 'Collection';
  address: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  nfts: Array<Nft>;
};

export type EnglishAuction = {
  __typename?: 'EnglishAuction';
  bidCount?: Maybe<Scalars['Int']['output']>;
  creator: Scalars['String']['output'];
  endTime?: Maybe<Scalars['Int']['output']>;
  ended?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['Int']['output'];
  maxBid?: Maybe<Scalars['Int']['output']>;
  maxBidder?: Maybe<Scalars['String']['output']>;
  nft?: Maybe<Nft>;
  startTime?: Maybe<Scalars['Int']['output']>;
  winner?: Maybe<Scalars['String']['output']>;
};


export type EnglishAuctionCreatorArgs = {
  findCreator: Scalars['String']['input'];
};

export type Nft = {
  __typename?: 'NFT';
  collectionAddress: Scalars['String']['output'];
  data?: Maybe<Scalars['String']['output']>;
  dataHash: Scalars['String']['output'];
  idx: Scalars['Int']['output'];
  imgUrl?: Maybe<Scalars['String']['output']>;
  locked?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  owner: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  nft: Nft;
  nfts: Array<Maybe<Nft>>;
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



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Collection: ResolverTypeWrapper<Collection>;
  EnglishAuction: ResolverTypeWrapper<EnglishAuction>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  NFT: ResolverTypeWrapper<Nft>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Collection: Collection;
  EnglishAuction: EnglishAuction;
  Int: Scalars['Int']['output'];
  NFT: Nft;
  Query: {};
  String: Scalars['String']['output'];
};

export type CollectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Collection'] = ResolversParentTypes['Collection']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nfts?: Resolver<Array<ResolversTypes['NFT']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EnglishAuctionResolvers<ContextType = any, ParentType extends ResolversParentTypes['EnglishAuction'] = ResolversParentTypes['EnglishAuction']> = {
  bidCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<EnglishAuctionCreatorArgs, 'findCreator'>>;
  endTime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  ended?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  maxBid?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  maxBidder?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nft?: Resolver<Maybe<ResolversTypes['NFT']>, ParentType, ContextType>;
  startTime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  winner?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NftResolvers<ContextType = any, ParentType extends ResolversParentTypes['NFT'] = ResolversParentTypes['NFT']> = {
  collectionAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dataHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  idx?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  imgUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  locked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  nft?: Resolver<ResolversTypes['NFT'], ParentType, ContextType, RequireFields<QueryNftArgs, 'collection' | 'idx'>>;
  nfts?: Resolver<Array<Maybe<ResolversTypes['NFT']>>, ParentType, ContextType, Partial<QueryNftsArgs>>;
};

export type Resolvers<ContextType = any> = {
  Collection?: CollectionResolvers<ContextType>;
  EnglishAuction?: EnglishAuctionResolvers<ContextType>;
  NFT?: NftResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

