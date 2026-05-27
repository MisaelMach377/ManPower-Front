import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";
import HomeContent from "../components/HomeContent";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENIDO */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* NAVBAR */}
        <Navbar />

        {/* CONTENIDO DINÁMICO */}
        <div style={{ flex: 1 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
