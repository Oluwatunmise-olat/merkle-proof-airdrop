// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {MerkleProof} from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract AirdropClaimContract is ReentrancyGuard {
    struct ClaimsMetadata {
        bool claimed;
        uint256 claimedAt;
    }

    // @todo: Read more about variable packing
    address public erc20TokenAddress;
    bytes32 private merkleRoot;
    address owner;
    mapping(address => ClaimsMetadata) claimedAddresses;

    event AirdropClaimed(address indexed to, uint256 amount);
    event MerkleRootHashUpdated(bytes32 merkleRoot);

    constructor(address _erc20TokenAddress, bytes32 _merkleRoot) {
        owner = msg.sender;
        erc20TokenAddress = _erc20TokenAddress;
        merkleRoot = _merkleRoot;
    }

    function ClaimAirdrop(bytes32[] memory _merkleProofs, uint256 _amount) external nonReentrant {
        address sender = msg.sender;
        IERC20 token = IERC20(erc20TokenAddress);
        ClaimsMetadata storage claims = claimedAddresses[sender];

        require(claims.claimed == false, "Airdrop already claimed");

        bytes32 leafHash = keccak256(abi.encodePacked(sender, _amount));
        require(MerkleProof.verify(_merkleProofs, merkleRoot, leafHash), "Invalid proofs");

        uint256 contractBalance = token.balanceOf(address(this));
        require(contractBalance >= _amount, "please try again later");

        claims.claimed = true;
        claims.claimedAt = block.timestamp;

        bool success = token.transfer(sender, _amount);
        require(success, "Airdrop claim transfer failed");

        emit AirdropClaimed(sender, _amount);
    }

    function UpdateMerkleRoot(bytes32 _merkleRoot) external {
        require(msg.sender == owner, "Access denied");
        merkleRoot = _merkleRoot;
        emit MerkleRootHashUpdated(_merkleRoot);
    }
}
