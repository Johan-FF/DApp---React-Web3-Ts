import { Web3ReactHooks } from "@web3-react/core";
import type { MetaMask } from "@web3-react/metamask";
// import { InjectedConnector } from "web3-react/dist/connectors";
import { InjectedConnector } from "@web3-react/injected-connector";

import { hooks as metaMaskHooks, metaMask } from "../connectors/metaMask";

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    //1, // : Ethereum Mainnet
    //3, // : Ropsten Testnet
    4, //: Rinkeby Testnet
    //5, //: Goerli Testnet
    //42, //: Kovan Testnet
  ],
});

export const connectors: [MetaMask, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
];
