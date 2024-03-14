import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Web3ReactProvider } from "@web3-react/core";

import { connectors } from "./config/web3";
import App from "./App.tsx";

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider connectors={connectors}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")!
);
