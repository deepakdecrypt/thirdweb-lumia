import { createWallet, inAppWallet } from "thirdweb/wallets"; // Import wallet creation functions

// Define wallet options using their specific identifiers
const wallets = [
  createWallet("io.metamask"),
  createWallet("walletConnect"),
  createWallet("com.trustwallet.app"),
  createWallet("global.safe"),
  createWallet("com.coinbase.wallet"),
  inAppWallet({
    auth: {
      mode: "popup",
      options: ["email", "phone", "google", "facebook", "apple"],
    },
  }),
];

// Export wallets configurations as named exports
export default wallets;
