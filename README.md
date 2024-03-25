# Disk On BlockChain

A decentralized storage solution based on Blockchain and ipfs, for security, data preservation and online identification.

## Live demo
[https://dobc.netlify.app/](https://dobc.netlify.app/) (comming son)


## Disk access 

you can access your disc in several ways:
- with the UX on web (see live demo)
- with the API just like another web link (comming son)
- from your own UX with javascript class (comming son)
- from another contract with solidity libraries (comming son)


## Install

```shell
npm i
```

## Test

```shell
npx hardhat test
```

## Run

Create a `.env` file with your own keys and:

```shell
npm start
```


### Install for web disk

You can install the explorer local and use a disk on blockchain. Just run, change nothing.
The explorer use default configuration on network goerli.
**config/config.js**
```
export const ETH_CHAINS = [goerli];
export const NETWORK_ID_SYMBOL = "ETH";
export const REGISTRY_ADDR = '0x57399e219E57866e8B106e6cBd8af3b36CB86420';
```

Create a `.env` file with your own keys for filecoin

### Install for local disk

Deploy the contracts (see deploy for more info)

Change network to Ganache in **config/config.js**
```
export const ETH_CHAINS = [localhost];
export const NETWORK_ID_SYMBOL = "GETH";
export const REGISTRY_ADDR = '<registry_address_on_ganache>';
```

Create a `.env` file with your own keys for filecoin


## Deploy

### Goerli Testnet

Disk: 0x0717EFFC74974f5a63C58923CE7C9f29cA914C2a
DiskRegistry: 0x57399e219E57866e8B106e6cBd8af3b36CB86420

### Sepolia Testnet

Disk: 0x57399e219E57866e8B106e6cBd8af3b36CB86420
DiskRegistry: 0x4Bc81D37d5EE89c4186aF81d438B0a9AF34BD5c6

### Auto deploy

```shell
npx hardhat run scripts/deploy.js --network localhost
```
| The disk and registry address are save in src/config. |
| --- |

### Manual deploy

- deploy disk contract
- deploy registry contract
- set the address of disk contract to the registry adddress with setDiskContractAddress(<disk_address>)

| :warning: Don't forget to copy your registry address in the explorer ! |
| --- |


## Update contract disk code

If you want to update the disk contract, deploy the new contract disk and set this new address in the registry.

| :warning: the new code will only be active for the new disk created, the existing disks will keep the old code. |
| --- |


## Technologies use

    - wagmi
    - connectkit
    - react-accessible-treeview


## Changelog

### v0.1.0

    Initial version


## License

MIT license (http://opensource.org/licenses/MIT)


## Support

You can contact me via [linkedin](https://www.linkedin.com/in/olivier-fernandez-95ba90218/)
