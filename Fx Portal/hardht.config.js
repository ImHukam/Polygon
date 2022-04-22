require("@nomiclabs/hardhat-waffle");
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');
const { mnemonic } = require('./secrets.json');


task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


module.exports = {
  defaultNetwork: "testnet",
  networks: {

  dashboard: {
     url: "http://localhost:24012/rpc"
   },

    localhost: {
      url: "http://127.0.0.1:7545"
    },
    hardhat: {
    },
    testnet: {
      url: "https://goerli.infura.io/v3/{infura id}",
      chainId: 5,
      gasPrice: 20000000000,
      accounts: {mnemonic: mnemonic}
    },
    mumbai: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: {mnemonic: mnemonic}
    }
  },
  etherscan: {
    apiKey: {
      goerli: 'etherscan api key'
    }
  },
  solidity: {
  version: "0.8.1",
  settings: {
    optimizer: {
      enabled: true
    }
   }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  }
};
