import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import HomeContent from "./components/HomeContent";

import Usuarios from "./Pages/Usuarios/Index";

function App() {
  return (
    <Routes>
      {/* LAYOUT PRINCIPAL */}
      <Route path="/" element={<Home />}>
        {/* DASHBOARD */}
        <Route index element={<HomeContent />} />

        {/* USUARIOS */}
        <Route path="usuarios" element={<Usuarios />} />
      </Route>
    </Routes>
  );
}

export default App;
