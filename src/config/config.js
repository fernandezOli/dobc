/* configuration file */
import { /*localhost,*/ goerli } from '@wagmi/chains'; //gnosis, gnosisChiado
//import { localhost_REGISTRY_ADDR } from './localhost_RegistryAddress';
import { goerli_REGISTRY_ADDR } from './goerli_RegistryAddress';

/* network */
/* Ganache localhost */
//export const ETH_CHAINS = [localhost];
//export const NETWORK_ID_SYMBOL = "GETH";
//export const REGISTRY_ADDR = localhost_REGISTRY_ADDR;

/* Goerli localhost */
export const ETH_CHAINS = [goerli];
export const NETWORK_ID_SYMBOL = "ETH";
export const REGISTRY_ADDR = goerli_REGISTRY_ADDR;

/*
CHECK_PX_GAS = N
PX_GAS = 3000000000
PX_GAS_GWEI = 1
PX_GAS_MARGIN = 2
LINK_PX_GAS = no_link
*/

/* other */
export const SITE_NAME = 'DOBC';
