import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Web3ReactProvider } from "@web3-react/core";
import { HashRouter } from "react-router-dom";

import { connectors } from "./config/web3";
import App from "./App.tsx";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <ChakraProvider>
        <Web3ReactProvider connectors={connectors}>
          <App />
        </Web3ReactProvider>
      </ChakraProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")!
);
