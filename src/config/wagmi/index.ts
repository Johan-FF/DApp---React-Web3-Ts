import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  arbitrumSepolia,
  base,
} from "wagmi/chains";
import { QueryClient } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: "ImaNFT",
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
  chains: [
    // mainnet, polygon, optimism, arbitrum, base,
    arbitrumSepolia,
  ],
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

export { queryClient, config };
