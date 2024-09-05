import { HardhatUserConfig, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const PRIVATE_KEY = vars.get("ACCOUNT_PK");
const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY");
const SEPOLIA_PRIVATE_KEY = vars.get("SEPOLIA_PRIVATE_KEY");
const ALCHEMY_API_KEY = vars.get("ALCHEMY_API_KEY");

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    lisk_sepolia: {
      accounts: [PRIVATE_KEY],
      url: "https://rpc.sepolia-api.lisk.com",
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};

export default config;
