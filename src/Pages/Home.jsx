import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";
import HomeContent from "../components/HomeContent"; // Importamos el contenido limpio con la tabla y tarjetas

export default function Home() {
  return (
    <div style={{ display: "flex", background: "#f8fafc", minHeight: "100vh" }}>
      {/* BARRA LATERAL */}
      <Sidebar />

      {/* CONTENEDOR PRINCIPAL */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* BARRA SUPERIOR */}
        <Navbar />

        {/* ZONA DE CONTENIDO DINÁMICO */}
        <div style={{ flex: 1 }}>
          <HomeContent />
        </div>
      </div>
    </div>
  );
}
