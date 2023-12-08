import create from "zustand";
import { immer } from "zustand/middleware/immer";

interface Auction {
    creator: string;
    nft: {
        imgUrl: string;
        name: string;
        collectionAddress: string;
    };
    endTime: number;
    startTime: number;
    ended: boolean;
    id: string;
}

interface TopBid {
    auction: Auction;
    amount: number;
}

interface TopBidState {
    loading: boolean;
    topBids: TopBid[];
    fetchTopBids: () => Promise<void>;
}

const TOP_BID_QUERY = `
  query MyQuery {
    topBids {
        auction {
          creator
          nft {
            imgUrl
            name
            collectionAddress
          }
          endTime
          startTime
          ended
          id
        }
        amount
      }
  }
`;

export const useTopBidStore = create<TopBidState, [["zustand/immer", never]]>(
    immer((set) => ({
        loading: false,
        topBids: [],
        fetchTopBids: async () => {
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
                        query: TOP_BID_QUERY,
                    }),
                });

                const { data } = await response.json();

                set((state) => {
                    state.loading = false;
                    state.topBids = data.topBids;
                });
            } catch (error) {
                console.error("Error fetching auctions:", error);
                set((state) => {
                    state.loading = false;
                });
            }
        },
    }))
);
