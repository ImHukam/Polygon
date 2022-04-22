// generating burn proof using tx hash of withdraw transaction

const { POSClient, use } = require("@maticnetwork/maticjs");
const { Web3ClientPlugin } = require("@maticnetwork/maticjs-ethers");
const { providers, Wallet } = require("ethers");

use(Web3ClientPlugin);

// connect provider to interact with eth and polygon chain
const parentProvider = new providers.JsonRpcProvider("rpc url");
const childProvider = new providers.JsonRpcProvider("rpc url");
const privateKey = "private key"; // only for testing purpose, use env for real development

const posClient = new POSClient();

async function main() {

  // initialization of posClient using matic js lib

  await posClient.init({
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: new Wallet(privateKey, parentProvider),
      defaultConfig: {
        from: "0xC980bBe81d7AE0CcbF72B6AbD59534dd8d176c77"
      }
    },
    child: {
      provider: new Wallet(privateKey, childProvider),
      defaultConfig: {
        from: "0xC980bBe81d7AE0CcbF72B6AbD59534dd8d176c77"
      }
    }
  });

  // interact to exit manager using withdraw manager to get burn proof
  const exit_manager = posClient.withdrawManager.exitManager;
  const BURN_HASH = '0x31f0cd46b7923a1d5b13f62881267d3d9dd6162a89e444b35a7cadb7b7fe8e0e';
  const SIG = '0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036';
  const proof = await exit_manager.buildPayloadForExit(BURN_HASH, SIG);
  console.log("Burn proof:", proof);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
