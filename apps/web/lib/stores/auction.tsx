import create from "zustand";
import { immer } from "zustand/middleware/immer";

export interface Auction {
  creator: string;
  id: string;
  endTime: string;
  ended: boolean;
  nft: {
    collectionAddress: string;
    name: string;
  };
}

interface AuctionState {
  loading: boolean;
  auctions: Auction[];
  fetchAuctions: () => Promise<void>;
}

const AUCTIONS_QUERY = `
  query MyQuery {
    auctions(live: true, creator: "") {
      creator
      id
      endTime
      startTime
      ended
      winner
      nft {
        collectionAddress
        name
        imgUrl
      }
    }
  }
`;

export const useAuctionStore = create<AuctionState, [["zustand/immer", never]]>(
  immer((set) => ({
    loading: false,
    auctions: [],
    fetchAuctions: async () => {
      try {
        set((state) => {
          state.loading = true;
        });

        const response = await fetch("http://localhost:4000/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `${AUCTIONS_QUERY}`,
          }),
        });

        const { data } = await response.json();

        set((state) => {
          state.loading = false;
          state.auctions = data.auctions;
        });
      } catch (error) {
        console.error("Error fetching auctions:", error);
        set((state) => {
          state.loading = false;
        });
      }
    },
  })),
);
