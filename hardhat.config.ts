import { HardhatUserConfig } from "hardhat/config";
import '@openzeppelin/hardhat-upgrades';
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  defaultNetwork: "hardhat",
  networks: {
  	localhost: {
      url: "http://127.0.0.1:8545"
    },
    hardhat: {
    },
    testnet: {
      url: process.env.BNB_RPC,
      chainId: 11155111,
      gasPrice: 20000000000,
      accounts: [process.env.PRIVATE_KEY!]
    },
    mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: [process.env.PRIVATE_KEY!]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  }
};

export default config;
