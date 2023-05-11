/* eslint-disable react-hooks/exhaustive-deps */
import { ethers } from 'ethers';
import React, { createContext, useState } from 'react';
import diskRegistry from "../class/diskRegistryClass";
//require('dotenv').config();
//import {} from 'dotenv/config'
//import * as dotenv from 'dotenv'; dotenv.config()

export const AuthContext = createContext();

//console.log('env : ', process.env);
export let NETWORK_ID_STR = '5777'; //process.env.NETWORK_ID_STR || ""
export let NETWORK_ID_INT = 5777;
export let NETWORK_ID_HEX = '0x1691';
export let NETWORK_NAME = 'Ganache';
export let NETWORK_ID_SYMBOL = 'GETH';
export let NETWORK_RPC_URL = "http://192.168.0.100:8545";
export let REGISTRY_ADDR = '0x2008b69Ee0A6099e6cE461a7fe5c8a9972E2a965';
export let IPFS_HEADER = 'https://ipfs.io/ipfs/'; // ipfs://


const AuthProvider = ({ children }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [balance, setBalance] = useState(0);

  if (!window.ethereum) {
    return;
  }

  const _provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  let diskRegistryClass = new diskRegistry(REGISTRY_ADDR, _provider);

  const _checkNetwork = async() => {
    if (window.ethereum.networkVersion === NETWORK_ID_STR) {
      return true;
    }
    return false;
  };

  const _checkUserConnection = () => {
    return window.ethereum.request({ method: 'eth_requestAccounts' });
  };

  const _initialize = (userAddress) => {
    try {
      if (userAddress === selectedAddress) return;
      setSelectedAddress(userAddress);
      _provider.getBalance(`${userAddress}`).then((res) => {
        //setBalance(parseInt(ethers.utils.formatEther(res._hex)));
        setBalance(parseInt(res._hex));
      });
    } catch (e) {
      console.error('Error while initializing', e);
    }
  };

  const _connectWallet = async () => {
    console.log('connect Wallet ...');
    let userAddress = null;
    try {
      if (!await _checkNetwork()) {
        //console.log('networkVersion: ', window.ethereum.networkVersion);
        await _switchNetwork(NETWORK_ID_HEX);
        window.location.reload();
      }
      userAddress = await window.ethereum.request({ method: 'eth_requestAccounts' });
      _initialize(userAddress);
    } catch (e) {
      console.error('Error while connecting Wallet: ', e);
      return null;
    }

    // init events
    window.ethereum.on('accountsChanged', ([newAddress]) => {
      console.log('accountsChanged !');
      window.location.reload();
    });

    window.ethereum.on('chainChanged', ([networkId]) => {
      console.log('Event chainChanged: ',networkId);
      window.location.reload();
    });

    return userAddress;
  };

  const _switchNetwork = async(hexNetworkId) => {
    console.log('Switch Network ...');
    if (!window.ethereum) {
      console.log("Install Metamask");
      return;
    }
    try {
      await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: hexNetworkId }] });
    } catch (e) {
      if (e.code === 4902) {
        alert('Unknow network, please add it before retry.');
        return;
      }
      console.error('Error while Switching Network: ', e);
    }
  }

  return (
    <AuthContext.Provider value={{ selectedAddress, _connectWallet, _switchNetwork, balance, _checkUserConnection, _provider, diskRegistryClass }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
