//npx hardhat run scripts/deploy.js --network localhost

//require("@nomicfoundation/hardhat-toolbox");
require('@nomiclabs/hardhat-ethers');
require("hardhat-gas-reporter");

/** @type import('hardhat/config').HardhatUserConfig */
//accounts: [process.env.GANACHE_PRIVATE_KEY || ""],

module.exports = {
  solidity: "0.8.17",
  networks: {
    localhost: {
      chainId: 1337,
      url: `http://192.168.0.100:8545`,
      gas: 2100000,
      gasPrice: 2000000000,
      blockGasLimit: 6000000,
    },
    gnosis: {
      chainId: 100,
      url: `https://rpc.gnosischain.com`,
      accounts: process.env.GOERLI_TESTNET_PRIVATE_KEY !== undefined ? [process.env.GOERLI_TESTNET_PRIVATE_KEY] : [],
      blockGasLimit: 30000000,
    },
    chiado: {
      chainId: 137,
      url: `https://rpc.chiadochain.net`,
      blockGasLimit: 30000000,
    }
  }
};
