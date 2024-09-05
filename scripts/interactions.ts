import { parseUnits } from "ethers";
import { ethers } from "hardhat";

/**
 * This file implements a way to interact with deployed contracts
 * @command npx hardhat run scripts/interaction.js --network lisk_sepolia
 */

async function main() {
  const deployedAirdropErc20ContractAddress = "";
  const deployedErc20ContractAddress = "";

  const tokenContract = await ethers.getContractAt(
    "IToken",
    deployedErc20ContractAddress
  );

  const airdropClaimContract = await ethers.getContractAt(
    "IAirdropClaim",
    deployedAirdropErc20ContractAddress
  );

  const approvedAmount = parseUnits("100", 18);

  const approvedTx = await tokenContract.approve(
    deployedErc20ContractAddress,
    approvedAmount
  );
  approvedTx.wait(); // wait for the transaction to be mined

  // const contractBalanceBeforeDeposit = await tokenContract.contractBalance();

  // const depositAmount = parseUnits("10", 18);
  // const depositTx = await airdropClaimContract.deposit(depositAmount);
  // await depositTx.wait();

  // const contractBalanceAfterDeposit = await tokenContract.contractBalance();

  // console.log(
  //   "Contract Balance BEFORE deposit::: ====>",
  //   contractBalanceBeforeDeposit
  // );

  // console.log(
  //   "Contract Balance AFTER deposit::: ====>",
  //   contractBalanceAfterDeposit
  // );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
