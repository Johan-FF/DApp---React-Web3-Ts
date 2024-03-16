import { Route } from "react-router-dom";
// import { useEffect } from "react";
// import Web3 from "web3";

import MainLayout from "./layouts/main";
import Home from "./views/home";

function App() {
  // useEffect(() => {
  //   if ("ethereum" in window) {
  //     window.ethereum
  //       .request({ method: "eth_requestAccounts" })
  //       .then((accounts) => console.log(accounts));

  //     const web3 = new Web3(window.ethereum);
  //     web3.eth.requestAccounts().then(console.log);
  //   }
  // }, []);

  return (
    <MainLayout>
      <Route exact path="/" component={Home} />
    </MainLayout>
  );
}

export default App;
