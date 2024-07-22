import { Route, Routes } from "react-router-dom";

import Home from "./views/home";
import Imas from "./views/imas";
import Ima from "./views/ima";

import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/imas" element={<Imas />} />
      <Route path="/imas/:tokenId" element={<Ima />} />
    </Routes>
  );
}

export default App;
