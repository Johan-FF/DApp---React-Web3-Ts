import { createHashRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import Web3 from "web3";

import Home from "./views/home";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

function App() {
  useEffect(() => {
    if ("ethereum" in window) {
      // window.ethereum
      //   .request({ method: "eth_requestAccounts" })
      //   .then((accounts) => console.log(accounts));

      const web3 = new Web3(window.ethereum);
      web3.eth.requestAccounts().then(console.log);
    }
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
