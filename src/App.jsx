import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import HomeContent from "./components/HomeContent";

import Usuarios from "./Pages/Usuarios/Index";
import Herramientas from "./Pages/Herramientas/Index";
import Celulares from "./Pages/Celulares/Index";
import Laptops from "./Pages/Laptops/Index";
import Asignaciones from "./Pages/Asignaciones/Index";

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

        {/* LAPTOPS */}
        <Route path="laptops" element={<Laptops />} />

        {/* ASIGNACIONES */}
        <Route path="asignacion" element={<Asignaciones />} />
      </Route>
    </Routes>
  );
}

export default App;
