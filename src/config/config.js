/* configuration file */
import { localhost } from '@wagmi/chains'; //gnosis, gnosisChiado
import { localhost_REGISTRY_ADDR } from './localhost_RegistryAddress';

/* network */
export const ETH_CHAINS = [localhost];
export const NETWORK_ID_SYMBOL = "GETH";
export const REGISTRY_ADDR = localhost_REGISTRY_ADDR;

/*
CHECK_PX_GAS = N
PX_GAS = 3000000000
PX_GAS_GWEI = 1
PX_GAS_MARGIN = 2
LINK_PX_GAS = no_link
*/

/* other */
export const SITE_NAME = 'DOBC';
