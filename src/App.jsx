import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import HomeContent from "./components/HomeContent";

import Usuarios from "./Pages/Usuarios/Index";
import Herramientas from "./Pages/Herramientas/Index";
import Celulares from "./Pages/Celulares/Index";

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

        {/* CELULARES */}
        <Route path="celulares" element={<Celulares />} />
      </Route>
    </Routes>
  );
}

export default App;
