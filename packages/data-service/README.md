A graphQL server, with an ETL job (indexer) to update/insert data on each new block produced
All read queries required by the frontend App will be served by this server.

### Local Testing

- `pnpm run dev` to start the dev graphQl server
- `pnpm run startIndexerJob` starts the indexer
- `pnpm run generateDummyNFTs` mints some NFTs to addresses hardcoded in the script  `generateDummyNFTs.ts`. Useful for testing


### Mongo DB
Need to set env variables to use mongo like this
```
DB_CONN_STRING="mongodb+srv://...."
DB_NAME="revl-dev"
DATA_STORAGE="mongo" # "local"
GRAPHQL_URL="http://127.0.0.1:8080/graphql"
```
