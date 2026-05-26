import React, { useState, useRef, useEffect } from "react";
import { Menu, LogOut, ChevronDown, User } from "lucide-react";

// Importa aquí tu imagen de perfil colocando la ruta correcta de tus assets
import userAvatar from "../assets/WhatsApp Image 2026-05-26 at 4.57.57 PM.jpeg";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar el dropdown si se hace click fuera de él
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    // Aquí agregas tu lógica de autenticación (limpiar tokens, cookies, etc.)
  };

  return (
    <header
      style={{
        height: "58px",
        background: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxSizing: "border-box",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* BOTÓN HAMBURGUESA (IZQUIERDA) */}
      <button
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: "#64748b",
          display: "flex",
          alignItems: "center",
          padding: "8px",
          borderRadius: "6px",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <Menu size={20} strokeWidth={2} />
      </button>

      {/* BLOQUE DE USUARIO (DERECHA) */}
      <div style={{ position: "relative" }} ref={dropdownRef}>
        <div
          onClick={() => setDropdownOpen(!dropdownOpen)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
            padding: "4px 8px",
            borderRadius: "8px",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
          onMouseLeave={(e) => {
            if (!dropdownOpen) e.currentTarget.style.background = "transparent";
          }}
        >
          {/* TEXTOS DEL PERFIL */}
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#0f172a",
                margin: 0,
              }}
            >
              Renzo Ramirez de Mumu
            </p>
            <p
              style={{
                fontSize: "10px",
                fontWeight: 600,
                color: "#94a3b8",
                textTransform: "uppercase",
                letterSpacing: "0.02em",
                margin: 0,
              }}
            >
              Cliente
            </p>
          </div>

          {/* AVATAR DE USUARIO (MÁS GRANDE) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px", // Espacio entre el círculo y la flecha de despliegue
            }}
          >
            {/* Contenedor del círculo del perfil */}
            <div
              style={{
                width: "42px", // Escalado de 32px a 42px
                height: "42px", // Escalado de 32px a 42px
                borderRadius: "50%",
                overflow: "hidden", // Asegura que la foto no se salga del círculo
                border: "2px solid #f1f5f9", // Un borde sutil que le da un acabado premium
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#cbd5e1",
              }}
            >
              <img
                src={userAvatar}
                alt="Avatar"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", // Mantiene la proporción de la foto de perfil sin deformarla
                }}
              />
            </div>

            {/* Flecha indicadora del dropdown */}
            <ChevronDown
              size={15}
              color="#64748b"
              style={{ marginTop: "2px" }}
            />
          </div>
        </div>

        {/* DROPDOWN POPUP FLOTANTE */}
        {dropdownOpen && (
          <div
            style={{
              position: "absolute",
              top: "46px",
              right: "0",
              width: "160px",
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "10px",
              boxShadow: "0 10px 25px -5px rgba(15, 23, 42, 0.08)",
              padding: "4px",
              zIndex: 100,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 12px",
                background: "transparent",
                border: "none",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: 500,
                color: "#475569",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#f1f5f9")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <User size={15} />
              Mi Perfil
            </button>

            <button
              onClick={handleLogout}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 12px",
                background: "transparent",
                border: "none",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: 600,
                color: "#ef4444", // Rojo sutil de peligro
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#fef2f2";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <LogOut size={15} />
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
