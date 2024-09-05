import { parseUnits } from "ethers";

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("AclTokenModule", (m: any) => {
  // const initialSupply = 1000000000000000000000;
  const initialSupply = parseUnits("1000", 18);

  const merkleRoot =
    "04aa5cff1adb22fdb2a26cfc41a46b6155c7ae5c814ed045f2d55aaf73c0aea9";

  const token = m.contract("AclToken", [initialSupply]);

  const airdropClaim = m.contract("AirdropClaimContract", [token, merkleRoot]);

  return { token, airdropClaim };
});
