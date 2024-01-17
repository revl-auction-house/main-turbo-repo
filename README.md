# REVL
It's a platform to host auctions, it's built using protokit a framework to build appChain or zkRollApp.

## Quick start

The monorepo contains packages and 1 app:

- `apps/web` contains the frontend implemented using svelte-kit 
- `packages/chain` contains everything related to your Protokit runtimes
- `packages/data-service` contains the backend services needed by the frontend and an indexer, and some scripts to do testing like minting nfts.

**Prerequisites:**

- Node.js v18
- pnpm
- nvm
- turbo

### Running the sequencer & UI

```zsh
# start UI server, needs data-service's gql server and the sequencer tunning to do transactions
pnpm dev -F=web
# start sequencer
pnpm dev -F=chain
# start data-service gql server
pnpm dev -F=data-service
# start indexer
pnpm run startIndexerJob
```

Navigate to `localhost:5173` to see the example UI, or to `localhost:8080/graphql` to see the GQL interface of the locally running sequencer & `localhost:4000/graphq` for the GQL interface of data-service
