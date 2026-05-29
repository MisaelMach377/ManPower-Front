import React, { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  User,
  Laptop,
  Smartphone,
  Wrench,
  ClipboardList,
} from "lucide-react";

import CrearAsignacion from "./CrearAsignaciones";
import Devolucion from "./Devolucion";

export default function Asignaciones() {
  const [asignaciones, setAsignaciones] = useState([]);
  const [hoverBtn, setHoverBtn] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDevolucion, setOpenDevolucion] = useState(false);
  const [asignacionSeleccionada, setAsignacionSeleccionada] = useState(null);

  const [fUsuario, setFUsuario] = useState("");
  const [fDocumento, setFDocumento] = useState("");
  const badgeDevolucion = (estado) => ({
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: "600",
    background: estado === "DEVUELTO" ? "#ecfdf5" : "#fef3c7",
    color: estado === "DEVUELTO" ? "#16a34a" : "#b45309",
  });

  useEffect(() => {
    obtenerAsignaciones();
  }, []);

  const obtenerAsignaciones = async () => {
    try {
      const res = await fetch("https://localhost:44382/api/AsignacionesApi");
      const data = await res.json();
      setAsignaciones(data);
    } catch (err) {
      console.log(err);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";
    const d = new Date(date);

    return `${String(d.getDate()).padStart(2, "0")}/${String(
      d.getMonth() + 1,
    ).padStart(2, "0")}/${d.getFullYear()}`;
  };

  const filtrados = asignaciones.filter((a) => {
    return (
      a.usuario?.toLowerCase().includes(fUsuario.toLowerCase()) &&
      a.documento?.toLowerCase().includes(fDocumento.toLowerCase())
    );
  });

  const page = {
    minHeight: "100vh",
    padding: "28px",
    background: "#f8fafc",
    fontFamily: "system-ui, sans-serif",
  };

  const container = { maxWidth: "1400px", margin: "0 auto" };

  const card = {
    background: "#fff",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  };

  const header = {
    padding: "18px 20px",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    justifyContent: "space-between",
  };

  const title = { fontSize: "18px", fontWeight: "600", color: "#0f172a" };

  const filtersBar = {
    display: "flex",
    justifyContent: "space-between",
    padding: "14px 20px",
    borderBottom: "1px solid #e2e8f0",
  };

  const inputWrapper = { position: "relative", display: "flex" };

  const input = {
    padding: "8px 12px 8px 36px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "13px",
    minWidth: "220px",
  };

  const iconInside = {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#94a3b8",
  };

  const table = { width: "100%", borderCollapse: "collapse" };

  const th = {
    textAlign: "left",
    fontSize: "11px",
    fontWeight: "600",
    color: "#64748b",
    padding: "12px",
    borderBottom: "1px solid #e2e8f0",
    textTransform: "uppercase",
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
    background:
      tipo === "LAPTOP"
        ? "#eff6ff"
        : tipo === "CELULAR"
          ? "#f0fdf4"
          : "#fff7ed",
    color:
      tipo === "LAPTOP"
        ? "#2563eb"
        : tipo === "CELULAR"
          ? "#16a34a"
          : "#c2410c",
  });

  const iconBtn = {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    padding: "6px",
    borderRadius: "6px",
  };

  const getIcon = (tipo) => {
    if (tipo === "LAPTOP") return <Laptop size={15} color="#2563eb" />;
    if (tipo === "CELULAR") return <Smartphone size={15} color="#16a34a" />;
    return <Wrench size={15} color="#c2410c" />;
  };

  const getEquipo = (a) => {
    return a.laptop || a.celular || a.herramienta || "-";
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
              }}
            >
              <Plus size={15} />
              Nueva Asignación
            </button>
          </div>

          {/* TABLE */}
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
                  <th style={th}>Estado Dev.</th>
                  <th style={th}>Fecha Dev.</th>
                  <th style={th}>Obs Dev.</th>
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
                      <div style={{ display: "flex", gap: "8px" }}>
                        {getIcon(a.tipoHerramienta)}
                        {getEquipo(a)}
                      </div>
                    </td>

                    <td style={td}>{a.numeroGuia || "-"}</td>
                    <td style={td}>{a.zona || "-"}</td>
                    <td style={td}>{a.estado}</td>
                    <td style={td}>{formatDate(a.fechaAsignacion)}</td>
                    <td style={td}>
                      <span style={badgeDevolucion(a.estadoDevolucion)}>
                        {a.estadoDevolucion || "PENDIENTE"}
                      </span>
                    </td>
                    <td style={td}>
                      {a.fechaDevolucion ? formatDate(a.fechaDevolucion) : "-"}
                    </td>

                    <td style={td}>{a.observacionDevolucion || "-"}</td>

                    <td style={{ ...td, display: "flex", gap: "6px" }}>
                      <button style={iconBtn}>
                        <Pencil size={15} />
                      </button>

                      <button style={iconBtn}>
                        <Trash2 size={15} color="#dc2626" />
                      </button>
                      <button
                        style={iconBtn}
                        onClick={() => {
                          setAsignacionSeleccionada(a); // 👈 guardas la fila
                          setOpenDevolucion(true); // 👈 abres modal
                        }}
                      >
                        <ClipboardList size={15} color="#2563eb" />
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

      {/* DEVOLUCION */}
      <Devolucion
        open={openDevolucion}
        onClose={() => setOpenDevolucion(false)}
        asignacion={asignacionSeleccionada}
        obtenerAsignaciones={obtenerAsignaciones}
      />
    </div>
  );
}
