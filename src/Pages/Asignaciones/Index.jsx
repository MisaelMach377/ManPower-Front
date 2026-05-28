import React, { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  User,
  Laptop,
  Smartphone,
} from "lucide-react";

import CrearAsignacion from "./CrearAsignaciones";

export default function Asignaciones() {
  const [asignaciones, setAsignaciones] = useState([]);

  const [hoverBtn, setHoverBtn] = useState(false);

  // MODAL
  const [openModal, setOpenModal] = useState(false);

  // FILTROS
  const [fUsuario, setFUsuario] = useState("");
  const [fDocumento, setFDocumento] = useState("");

  useEffect(() => {
    obtenerAsignaciones();
  }, []);

  // OBTENER ASIGNACIONES
  const obtenerAsignaciones = async () => {
    try {
      const res = await fetch("https://localhost:44382/api/AsignacionesApi");

      const data = await res.json();

      setAsignaciones(data);
    } catch (err) {
      console.log(err);
    }
  };

  // FORMATEAR FECHA
  const formatDate = (date) => {
    if (!date) return "-";

    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
  };

  // FILTROS
  const filtrados = asignaciones.filter((a) => {
    return (
      a.usuario?.toLowerCase().includes(fUsuario.toLowerCase()) &&
      a.documento?.toLowerCase().includes(fDocumento.toLowerCase())
    );
  });

  // ESTILOS
  const page = {
    minHeight: "100vh",
    padding: "28px",
    background: "#f8fafc",
    fontFamily: "system-ui, sans-serif",
  };

  const container = {
    maxWidth: "1400px",
    margin: "0 auto",
  };

  const card = {
    background: "#fff",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05)",
  };

  const header = {
    padding: "18px 20px",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const title = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#0f172a",
  };

  const filtersBar = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 20px",
    borderBottom: "1px solid #e2e8f0",
  };

  const inputWrapper = {
    position: "relative",
    display: "flex",
    alignItems: "center",
  };

  const input = {
    padding: "8px 12px 8px 36px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "13px",
    outline: "none",
    minWidth: "220px",
  };

  const iconInside = {
    position: "absolute",
    left: "12px",
    color: "#94a3b8",
  };

  const table = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const th = {
    textAlign: "left",
    fontSize: "11px",
    fontWeight: "600",
    color: "#64748b",
    padding: "12px",
    textTransform: "uppercase",
    borderBottom: "1px solid #e2e8f0",
  };

  const td = {
    padding: "12px",
    fontSize: "13px",
    color: "#334155",
    borderBottom: "1px solid #f1f5f9",
  };

  const badge = (tipo) => ({
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: "600",
    background: tipo === "LAPTOP" ? "#eff6ff" : "#f0fdf4",

    color: tipo === "LAPTOP" ? "#2563eb" : "#16a34a",
  });

  const iconBtn = {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    padding: "6px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={page}>
      <div style={container}>
        <div style={card}>
          {/* HEADER */}
          <div style={header}>
            <div style={title}>Asignaciones</div>
          </div>

          {/* FILTROS */}
          <div style={filtersBar}>
            <div style={{ display: "flex", gap: "10px" }}>
              <div style={inputWrapper}>
                <Search size={15} style={iconInside} />

                <input
                  style={input}
                  placeholder="Buscar usuario..."
                  value={fUsuario}
                  onChange={(e) => setFUsuario(e.target.value)}
                />
              </div>

              <div style={inputWrapper}>
                <User size={15} style={iconInside} />

                <input
                  style={input}
                  placeholder="Documento..."
                  value={fDocumento}
                  onChange={(e) => setFDocumento(e.target.value)}
                />
              </div>
            </div>

            {/* BOTÓN */}
            <button
              onClick={() => setOpenModal(true)}
              onMouseEnter={() => setHoverBtn(true)}
              onMouseLeave={() => setHoverBtn(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 12px",
                borderRadius: "8px",
                border: "none",
                background: hoverBtn ? "#0f172a" : "#1e293b",
                color: "#fff",
                fontWeight: "500",
                fontSize: "13px",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <Plus size={15} />
              Nueva Asignación
            </button>
          </div>

          {/* TABLA */}
          <div style={{ padding: "0 10px" }}>
            <table style={table}>
              <thead>
                <tr>
                  <th style={th}>Usuario</th>
                  <th style={th}>Documento</th>
                  <th style={th}>Tipo</th>
                  <th style={th}>Equipo</th>
                  <th style={th}>Guía</th>
                  <th style={th}>Zona</th>
                  <th style={th}>Estado</th>
                  <th style={th}>Fecha</th>
                  <th style={th}>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filtrados.map((a) => (
                  <tr key={a.id}>
                    <td style={td}>{a.usuario}</td>

                    <td style={td}>{a.documento}</td>

                    <td style={td}>
                      <span style={badge(a.tipoHerramienta)}>
                        {a.tipoHerramienta}
                      </span>
                    </td>

                    <td style={td}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        {a.tipoHerramienta === "LAPTOP" ? (
                          <Laptop size={15} color="#2563eb" />
                        ) : (
                          <Smartphone size={15} color="#16a34a" />
                        )}

                        {a.laptop || a.celular}
                      </div>
                    </td>

                    <td style={td}>{a.numeroGuia || "-"}</td>

                    <td style={td}>{a.zona || "-"}</td>

                    <td style={td}>{a.estado}</td>

                    <td style={td}>{formatDate(a.fechaAsignacion)}</td>

                    {/* ACCIONES */}
                    <td style={{ ...td, display: "flex", gap: "4px" }}>
                      <button
                        style={iconBtn}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.background = "#f1f5f9")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        <Pencil size={15} color="#475569" />
                      </button>

                      <button
                        style={iconBtn}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.background = "#fef2f2")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        <Trash2 size={15} color="#dc2626" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <CrearAsignacion
        open={openModal}
        onClose={() => setOpenModal(false)}
        obtenerAsignaciones={obtenerAsignaciones}
      />
    </div>
  );
}
