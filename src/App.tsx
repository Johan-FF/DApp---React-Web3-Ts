import { Route, Routes } from "react-router-dom";

import Home from "./views/home";
import Imas from "./views/imas";

import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/imas" element={<Imas />} />
    </Routes>
  );
}

export default App;
