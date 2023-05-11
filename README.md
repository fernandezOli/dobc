# Immutable Decentralized Disk Storage

A decentralized storage solution based on Blockchain and ipfs, for security, preservation and online identification.

Try running some of the following tasks:


## Live demo
[https://dobc.netlify.app/](https://dobs.netlify.app/)


## Disk access 

you can access your disc in several ways:
- with the UX on web (see live demo)
- with the API just like another web link (comming son)
- from your own UX with javascript class
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

You can install the explorer local and use a disk on blockchain. Just run change nothing.
The explorer use default configuration on network XXX.

Create a `.env` file with your own keys for filecoin

### Install for local disk

Deploy the contracts (see deploy for more info)
Change network to Ganache in **config.js**
```
export const ETH_CHAINS = [localhost];
export const NETWORK_ID_SYMBOL = "GETH";
export const REGISTRY_ADDR = '0x2008b69Ee0A6099e6cE461a7fe5c8a9972E2a965';
export let REGISTRY_ADDR = '<registry_address_on_ganache>';
```

Create a `.env` file with your own keys for filecoin


## Deploy

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


## Changelog

### v0.1.0

    Initial version


## Support

You can contact me via [linkedin](https://www.linkedin.com/in/olivier-fernandez-95ba90218/)
