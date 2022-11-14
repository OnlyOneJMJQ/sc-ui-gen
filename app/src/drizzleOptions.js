import Auction from "./contracts/Auction.json";

const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:9545",
    },
  },
  contracts: [Auction],
  events: {
    Auction: ["Start", "Bid", "End"],
  },
  polls: {
    accounts: 30000,
  },
};

export default options;
