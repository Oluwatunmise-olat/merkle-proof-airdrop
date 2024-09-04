/**
 * @notes: Read more about merkle trees here - https://medium.com/coinmonks/merkle-tree-a-simple-explanation-and-implementation-48903442bc08
 */

import csvParser from "csv-parser";
import fs from "fs";
import keccak256 from "keccak256";
import MerkleTree from "merkletreejs";
import path from "path";
import { cwd } from "process";

import { __Object__ } from "../common/typings/generic";

const __CWD_DIR__ = cwd();

const csvPath = path.resolve(__CWD_DIR__, "sample.csv");
const merkleProofPath = path.join(__CWD_DIR__, "merkle_proof.json");

const leafNodes: Array<Buffer> = [];
const addressToLeafNodeMapping: __Object__ = {};

fs.createReadStream(csvPath)
  .pipe(csvParser({ headers: ["address", "value"] }))
  .on("data", (data) => hashMerkleLeafAndAppend(data))
  .on("end", () => generateMerkleRoot());

const hashMerkleLeafAndAppend = (payload: {
  address: string;
  value: string;
}) => {
  let { address, value } = payload;

  const cleanedAddress = address.slice(2);
  // make sure value is 64 characters long (in Ethereum, a uint256 is represented by 32 bytes, which is 64 hexadecimal characters.)
  value = value.padStart(64, "0");

  const addressBuffer = Buffer.from(cleanedAddress, "hex");
  const valueBuffer = Buffer.from(value, "hex");
  const concatenatedDataBuffer = Buffer.concat([addressBuffer, valueBuffer]);

  const hash = keccak256(concatenatedDataBuffer);

  leafNodes.push(hash);
  addressToLeafNodeMapping[hash.toString("hex")] = address;
};

const generateMerkleRoot = () => {
  const hashFn = keccak256;

  const tree = new MerkleTree(leafNodes, hashFn, { sortPairs: true });

  const root = tree.getRoot().toString("hex");

  console.log("Merkle Root :::", root);

  generateMerkleProofsForEachAddressAndWriteToFile(tree);
};

/**
 * @notes: A Merkle proof is a set of hashes that, when combined with a specific leaf, can reconstruct the Merkle root. It allows verification that a specific leaf is part of the tree without needing the entire tree.
 */
const generateMerkleProofsForEachAddressAndWriteToFile = (
  merkleTree: MerkleTree
) => {
  const addressMerkleProofMapping: __Object__ = {};

  leafNodes.forEach((leaf) => {
    const proof = merkleTree.getHexProof(leaf);

    const lookUpKey = leaf.toString("hex");

    const address = addressToLeafNodeMapping[lookUpKey];

    addressMerkleProofMapping[address] = {
      address,
      leaf: lookUpKey,
      proof,
    };
  });

  fs.writeFileSync(merkleProofPath, JSON.stringify(addressMerkleProofMapping));
};
