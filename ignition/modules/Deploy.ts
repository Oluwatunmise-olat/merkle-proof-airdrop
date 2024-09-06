import { parseUnits, ethers } from "ethers";

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("AclTokenModule", (m: any) => {
  const initialSupply = parseUnits("1000", 18);

  const token = m.contract("AclToken", [initialSupply]);

  console.log(token);

  return { token };
});

// AclTokenModule#AclToken - 0x1Cf11A95FeE8B5F906131eFCcF9D108A08834D91

// --deployment-id airdrop-claim
