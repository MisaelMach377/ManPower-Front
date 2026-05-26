import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  ChevronDown,
  Building2,
  LogOut,
  User,
  Settings,
} from "lucide-react";

export default function Navbar({ onMenuClick, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar el menú si el usuario hace clic fuera de él
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      style={{
        height: "58px",
        background: "#ffffff",
        borderBottom: "1px solid #f1f5f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 18px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxSizing: "border-box",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif",
      }}
    >
      {/* IZQUIERDA */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button
          onClick={onMenuClick}
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "11px",
            border: "1px solid #f1f5f9",
            background: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.18s ease",
            color: "#475569",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff")}
        >
          <Menu size={18} strokeWidth={1.8} />
        </button>
      </div>

      {/* DERECHA (CONTENEDOR RELATIVO PARA EL DROPDOWN) */}
      <div style={{ position: "relative" }} ref={dropdownRef}>
        {/* BOTÓN PERFIL */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
            padding: "6px 10px",
            borderRadius: "12px",
            backgroundColor: isOpen ? "#f8fafc" : "transparent",
            transition: "all 0.15s ease",
            userSelect: "none",
          }}
          onMouseEnter={(e) => {
            if (!isOpen) e.currentTarget.style.backgroundColor = "#f8fafc";
          }}
          onMouseLeave={(e) => {
            if (!isOpen) e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          {/* TEXTOS - IGUALADOS A LA REFERENCIA COORPORATIVA */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              lineHeight: 1.25,
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700, // Más fuerte para mantener el estilo limpio y claro
                color: "#0f172a", // Cambiado a gris pizarra oscuro (estilo SaaS premium)
                letterSpacing: "-0.01em",
              }}
            >
              Renzo Ramirez de Mumu
            </span>
            <span
              style={{
                fontSize: "9.5px",
                color: "#94a3b8",
                fontWeight: 700, // Marcado en Bold idéntico a Beta S.A.
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Cliente
            </span>
          </div>

          {/* AVATAR Y FLECHA */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #49a5ab 0%, #3b8d93 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(59, 141, 147, 0.15)",
              }}
            >
              <Building2 size={15} color="#ffffff" strokeWidth={1.8} />
            </div>

            <ChevronDown
              size={14}
              color={isOpen ? "#0f172a" : "#94a3b8"}
              style={{
                transition: "transform 0.2s ease, color 0.2s ease",
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </div>
        </div>

        {/* =========================================
            DROPDOWN MENÚ (MINIMALISTA)
        ========================================= */}
        {isOpen && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 6px)",
              right: 0,
              width: "180px",
              background: "#ffffff",
              border: "1px solid #f1f5f9",
              borderRadius: "12px",
              boxShadow:
                "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
              padding: "6px",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              animation: "fadeIn 0.12s ease-out",
            }}
          >
            <DropdownItem icon={<User size={15} />} label="Perfil" />
            <DropdownItem icon={<Settings size={15} />} label="Ajustes" />

            {/* Separador sutil */}
            <div
              style={{
                height: "1px",
                background: "#f1f5f9",
                margin: "4px 6px",
              }}
            />

            {/* BOTÓN CERRAR SESIÓN */}
            <button
              onClick={onLogout}
              style={{
                width: "100%",
                padding: "8px 10px",
                borderRadius: "8px",
                border: "none",
                background: "transparent",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                color: "#ef4444",
                fontSize: "13.5px",
                fontWeight: 550,
                textAlign: "left",
                transition: "background 0.12s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#fef2f2")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <LogOut size={15} strokeWidth={1.8} />
              <span>Cerrar sesión</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

/* =========================================
   COMPONENTE AUXILIAR PARA ITEMS DEL MENÚ
========================================= */
function DropdownItem({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: "8px 10px",
        borderRadius: "8px",
        border: "none",
        background: "transparent",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        cursor: "pointer",
        color: "#475569",
        fontSize: "13.5px",
        fontWeight: 500,
        textAlign: "left",
        transition: "all 0.12s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#f1f5f9";
        e.currentTarget.style.color = "#0f172a";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = "#475569";
      }}
    >
      <span style={{ color: "#94a3b8", display: "flex", alignItems: "center" }}>
        {icon}
      </span>
      <span>{label}</span>
    </button>
  );
}
