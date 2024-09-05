// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

interface IAirdropClaim {
    function ClaimAirdrop(bytes32[] memory _merkleProofs, uint256 _amount) external;

    function UpdateMerkleRoot(bytes32 _merkleRoot) external;
}
