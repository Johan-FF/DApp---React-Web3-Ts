import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider, http } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  arbitrumSepolia,
  base,
} from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import App from "./App.tsx";

const config = getDefaultConfig({
  appName: "ImaNFT",
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
  chains: [mainnet, polygon, optimism, arbitrum, arbitrumSepolia, base],
  transports: {
    [mainnet.id]: http(""),
    [polygon.id]: http(""),
    [optimism.id]: http(""),
    [arbitrum.id]: http(""),
    [arbitrumSepolia.id]: http(""),
    [base.id]: http(""),
  },
});

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
  document.getElementById("root")!
);
