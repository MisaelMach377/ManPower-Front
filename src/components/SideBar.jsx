import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Wrench,
  Smartphone,
  Laptop,
  ClipboardCheck,
  RotateCcw,
  History,
  Layers3,
} from "lucide-react";

import logo from "../assets/Logo-MANPOWER_sinfondo.png";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside
      style={{
        width: "220px",
        height: "100vh",
        background: "#ffffff",
        borderRight: "1px solid #e2e8f0",
        padding: "26px 8px 16px 8px",
        boxSizing: "border-box",
        fontFamily: "system-ui, -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER LOGO */}
      <div style={{ padding: "6px 2px 12px 15px", marginBottom: "14px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingLeft: "14px",
            height: "52px",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ width: "138px", objectFit: "contain" }}
          />
        </div>
      </div>

      {/* MENÚ */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <SectionTitle title="Módulos" />

        <SidebarButton
          icon={<LayoutDashboard size={17} strokeWidth={1.8} />}
          label="Dashboard"
          active={location.pathname === "/"}
          onClick={() => navigate("/")}
        />

        <SidebarButton
          icon={<Users size={17} strokeWidth={1.8} />}
          label="Usuarios"
          active={location.pathname === "/usuarios"}
          onClick={() => navigate("/usuarios")}
        />

        <SectionTitle title="Inventario" style={{ marginTop: "16px" }} />

        <SidebarButton
          icon={<Wrench size={17} strokeWidth={1.8} />}
          label="Herramientas"
          active={location.pathname === "/herramientas"}
          onClick={() => navigate("/herramientas")}
        />

        <SidebarButton
          icon={<Smartphone size={17} strokeWidth={1.8} />}
          label="Celulares"
          active={location.pathname === "/celulares"}
          onClick={() => navigate("/celulares")}
        />

        <SidebarButton
          icon={<Laptop size={17} strokeWidth={1.8} />}
          label="Laptops"
          active={location.pathname === "/laptops"}
          onClick={() => navigate("/laptops")}
        />

        <SectionTitle title="Operaciones" style={{ marginTop: "16px" }} />

        <SidebarButton
          icon={<ClipboardCheck size={17} strokeWidth={1.8} />}
          label="Asignación"
          active={location.pathname === "/asignacion"}
          onClick={() => navigate("/asignacion")}
        />

        <SidebarButton
          icon={<RotateCcw size={17} strokeWidth={1.8} />}
          label="Devolución"
          active={location.pathname === "/devolucion"}
          onClick={() => navigate("/devolucion")}
        />

        <SidebarButton
          icon={<History size={17} strokeWidth={1.8} />}
          label="Historial"
          active={location.pathname === "/historial"}
          onClick={() => navigate("/historial")}
        />

        <SidebarButton
          icon={<Layers3 size={17} strokeWidth={1.8} />}
          label="Categorías"
          active={location.pathname === "/categorias"}
          onClick={() => navigate("/categorias")}
        />
      </div>
    </aside>
  );
}

/* =========================================
   TITULO SECCION (CON INDICADOR DE MARCA)
========================================= */
function SectionTitle({ title, style }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: "12px",
        marginBottom: "6px",
        ...style,
      }}
    >
      <p
        style={{
          fontSize: "10px",
          fontWeight: 700,
          color: "#94a3b8",
          letterSpacing: "0.05em",
          paddingLeft: "14px",
          textTransform: "uppercase",
          margin: 0,
        }}
      >
        {title}
      </p>
      {/* Mini isotipo de la marca a la derecha, tal cual el diseño */}
      <span
        style={{
          fontSize: "11px",
          fontWeight: "bold",
          background: "linear-gradient(135deg, #f27405 0%, #2c8a93 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          opacity: 0.8,
        }}
      >
        ✕
      </span>
    </div>
  );
}

/* =========================================
   SIDEBAR BUTTON (DEGRADADO PREMIUM)
========================================= */
function SidebarButton({ icon, label, active = false, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        height: "40px",
        border: "none",
        // Aquí ocurre la magia: Mezclamos el Naranja (#f27405) y el Turquesa (#2c8a93) con un ángulo de 135 grados
        background: active
          ? "linear-gradient(135deg, #f27405 0%, #2c8a93 75%)"
          : "transparent",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "0 14px",
        cursor: "pointer",
        color: active ? "#ffffff" : "#64748b",
        fontSize: "13.5px",
        fontWeight: active ? 600 : 500,
        fontFamily: "inherit",
        transition: "all 0.2s ease-in-out",
        boxShadow: active ? "0 4px 12px rgba(44, 138, 147, 0.25)" : "none",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.background = "#f1f5f9";
          e.currentTarget.style.color = "#0f172a";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "#64748b";
        }
      }}
    >
      <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>
      <span style={{ letterSpacing: "-0.01em" }}>{label}</span>
    </button>
  );
}
