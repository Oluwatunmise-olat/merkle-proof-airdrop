import { hexlify, zeroPadValue } from "ethers";

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("AirdropClaimModule", (m: any) => {
  const merkleRootString =
    "1dfc3268e65cf623a4952cc71088d140ba772884f06b8ca3a555af1785990055";
  const merkleRoot = zeroPadValue(hexlify(`0x${merkleRootString}`), 32);

  const tokenCA = "0x1Cf11A95FeE8B5F906131eFCcF9D108A08834D91";

  const airdropClaim = m.contract("AirdropClaimContract", [
    tokenCA,
    merkleRoot,
  ]);

  return { airdropClaim };
});

// --deployment-id airdrop-claim-2
// AirdropClaimModule#AirdropClaimContract - 0x1A4a1Fa94182692da42f9dabef1E84d44d1B5551
