import { Web3ReactHooks } from "@web3-react/core";
import type { MetaMask } from "@web3-react/metamask";
import { hooks as metaMaskHooks, metaMask } from "../connectors/metaMask";

export const connectors: [MetaMask, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
];
