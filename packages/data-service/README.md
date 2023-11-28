A graphQL server, with an etl job (indexer) to update/insert data on each new block produced
All read queries required by frontend App will be served by this server.

### Local Testing

- `pnpm run dev` to start the dev graphQl server
- `pnpm run codegen` generates types
- `pnpm run generateDummyData` run once from inside the package, to create `.local_DB`, one the local graphQL server can serve some Dummy Data
