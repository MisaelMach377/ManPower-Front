import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import HomeContent from "./components/HomeContent";

import Usuarios from "./Pages/Usuarios/Index";
import Herramientas from "./Pages/Herramientas/Index";

function App() {
  return (
    <Routes>
      {/* LAYOUT PRINCIPAL */}
      <Route path="/" element={<Home />}>
        {/* DASHBOARD */}
        <Route index element={<HomeContent />} />

        {/* USUARIOS */}
        <Route path="usuarios" element={<Usuarios />} />

        {/* HERRAMIENTAS */}
        <Route path="herramientas" element={<Herramientas />} />
      </Route>
    </Routes>
  );
}

export default App;
