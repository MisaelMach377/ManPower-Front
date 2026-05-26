import React from "react";
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
          active
        />
        <SidebarButton
          icon={<Users size={17} strokeWidth={1.8} />}
          label="Usuarios"
        />

        <SectionTitle title="Inventario" style={{ marginTop: "16px" }} />
        <SidebarButton
          icon={<Wrench size={17} strokeWidth={1.8} />}
          label="Herramientas"
        />
        <SidebarButton
          icon={<Smartphone size={17} strokeWidth={1.8} />}
          label="Celulares"
        />
        <SidebarButton
          icon={<Laptop size={17} strokeWidth={1.8} />}
          label="Laptops"
        />

        <SectionTitle title="Operaciones" style={{ marginTop: "16px" }} />
        <SidebarButton
          icon={<ClipboardCheck size={17} strokeWidth={1.8} />}
          label="Asignación"
        />
        <SidebarButton
          icon={<RotateCcw size={17} strokeWidth={1.8} />}
          label="Devolución"
        />
        <SidebarButton
          icon={<History size={17} strokeWidth={1.8} />}
          label="Historial"
        />
        <SidebarButton
          icon={<Layers3 size={17} strokeWidth={1.8} />}
          label="Categorías"
        />
      </div>
    </aside>
  );
}

function SectionTitle({ title, style }) {
  return (
    <p
      style={{
        fontSize: "10px",
        fontWeight: 700,
        color: "#94a3b8",
        letterSpacing: "0.05em",
        marginBottom: "6px",
        paddingLeft: "14px",
        textTransform: "uppercase",
        ...style,
      }}
    >
      {title}
    </p>
  );
}

function SidebarButton({ icon, label, active = false }) {
  return (
    <button
      style={{
        width: "100%",
        height: "40px",
        border: "none",
        background: active ? "#2c8a93" : "transparent", // Ajustado al turquesa del logo
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
        transition: "all 0.15s ease",
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
      <span>{label}</span>
    </button>
  );
}
