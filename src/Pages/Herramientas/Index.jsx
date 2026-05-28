import React, { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Package,
  FileSpreadsheet,
} from "lucide-react";

import CrearHerramienta from "./CrearHerramienta";
import EditarHerramienta from "./EditarHerramienta";
import EliminarHerramienta from "./EliminarHerramienta";

export default function Herramientas() {
  const [herramientas, setHerramientas] = useState([]);

  const [hoverBtn, setHoverBtn] = useState(false);
  const [hoverExcel, setHoverExcel] = useState(false);

  // MODALS
  const [openModal, setOpenModal] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);
  const [herramientaEdit, setHerramientaEdit] = useState(null);

  const [openDelete, setOpenDelete] = useState(false);
  const [herramientaDelete, setHerramientaDelete] = useState(null);

  // FILTROS
  const [fDescripcion, setFDescripcion] = useState("");
  const [fCategoria, setFCategoria] = useState("");

  useEffect(() => {
    obtenerHerramientas();
  }, []);

  // OBTENER DATA
  const obtenerHerramientas = async () => {
    try {
      const res = await fetch("https://localhost:44382/api/HerramientasApi");

      const data = await res.json();

      setHerramientas(data);
    } catch (err) {
      console.log(err);
    }
  };

  // FILTRAR
  const filtrados = herramientas.filter((h) => {
    return (
      h.descripcion?.toLowerCase().includes(fDescripcion.toLowerCase()) &&
      h.categoria?.toLowerCase().includes(fCategoria.toLowerCase())
    );
  });

  // EXPORTAR EXCEL
  const exportarExcel = () => {
    window.open(
      "https://localhost:44382/api/HerramientasApi/export/excel",
      "_blank",
    );
  };

  // ESTILOS
  const page = {
    minHeight: "100vh",
    padding: "28px",
    background: "#f8fafc",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
  };

  const container = {
    maxWidth: "1400px",
    margin: "0 auto",
  };

  const card = {
    background: "#fff",
    borderRadius: "12px",
    boxShadow:
      "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e2e8f0",
    overflow: "hidden",
  };

  const header = {
    padding: "18px 20px",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const title = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#0f172a",
  };

  const filtersBar = {
    display: "flex",
    justifyContent: "space-between",
    padding: "14px 20px",
    borderBottom: "1px solid #e2e8f0",
    background: "#fff",
    alignItems: "center",
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
    minWidth: "210px",
    background: "#fff",
    color: "#334155",
  };

  const iconInside = {
    position: "absolute",
    left: "12px",
    color: "#94a3b8",
    pointerEvents: "none",
  };

  const btnExcel = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    background: hoverExcel ? "#f1f5f9" : "#fff",
    color: "#334155",
    fontWeight: "500",
    fontSize: "13px",
    cursor: "pointer",
    transition: "all 0.15s ease",
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
    letterSpacing: "0.05em",
    borderBottom: "1px solid #e2e8f0",
  };

  const td = {
    padding: "12px",
    fontSize: "13px",
    color: "#334155",
    borderBottom: "1px solid #f1f5f9",
  };

  const badge = (active) => ({
    padding: "2px 8px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "500",
    background: active ? "#f0fdf4" : "#fef2f2",
    color: active ? "#16a34a" : "#dc2626",
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
    transition: "background 0.2s",
  };

  return (
    <div style={page}>
      <div style={container}>
        <div style={card}>
          {/* HEADER */}
          <div style={header}>
            <div style={title}>Herramientas</div>
          </div>

          {/* FILTROS */}
          <div style={filtersBar}>
            {/* IZQUIERDA */}
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <div style={inputWrapper}>
                <Search size={15} style={iconInside} />

                <input
                  style={input}
                  placeholder="Buscar herramienta..."
                  value={fDescripcion}
                  onChange={(e) => setFDescripcion(e.target.value)}
                />
              </div>

              <div style={inputWrapper}>
                <Package size={15} style={iconInside} />

                <input
                  style={input}
                  placeholder="Categoría..."
                  value={fCategoria}
                  onChange={(e) => setFCategoria(e.target.value)}
                />
              </div>

              {/* EXPORTAR */}
              <button
                onClick={exportarExcel}
                onMouseEnter={() => setHoverExcel(true)}
                onMouseLeave={() => setHoverExcel(false)}
                style={btnExcel}
              >
                <FileSpreadsheet
                  size={15}
                  strokeWidth={2}
                  style={{ color: "#16a34a" }}
                />

                <span>Exportar</span>
              </button>
            </div>

            {/* DERECHA */}
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
                marginLeft: "auto",
              }}
            >
              <Plus size={15} />
              Nueva Herramienta
            </button>
          </div>

          {/* TABLA */}
          <div style={{ padding: "0 10px" }}>
            <table style={table}>
              <thead>
                <tr>
                  <th style={th}>Descripción</th>
                  <th style={th}>Unidad</th>
                  <th style={th}>Familia</th>
                  <th style={th}>Stock</th>
                  <th style={th}>Precio</th>
                  <th style={th}>Categoría</th>
                  <th style={th}>Estado</th>
                  <th style={th}>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filtrados.map((h) => (
                  <tr key={h.id}>
                    <td style={td}>{h.descripcion}</td>

                    <td style={td}>
                      <span
                        style={{
                          padding: "4px 10px",
                          borderRadius: "999px",
                          fontSize: "12px",
                          fontWeight: "600",
                          background: "#eff6ff",
                          color: "#2563eb",
                          border: "1px solid #dbeafe",
                        }}
                      >
                        {h.unidadMedida || "Sin unidad"}
                      </span>
                    </td>
                    <td style={td}>{h.familia || "-"}</td>

                    <td style={td}>{h.stock}</td>

                    <td style={td}>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "5px 10px",
                          borderRadius: "10px",
                          background: "#f0fdf4",
                          border: "1px solid #dcfce7",
                          color: "#15803d",
                          fontWeight: "700",
                          fontSize: "13px",
                        }}
                      >
                        <span style={{ fontSize: "11px", opacity: 0.8 }}>
                          PEN
                        </span>

                        <span>S/ {Number(h.precio).toFixed(2)}</span>
                      </div>
                    </td>
                    <td style={td}>{h.categoria}</td>

                    <td style={td}>
                      <span style={badge(h.estado)}>
                        {h.estado ? "Activo" : "Inactivo"}
                      </span>
                    </td>

                    {/* ACCIONES */}
                    <td style={{ ...td, display: "flex", gap: "4px" }}>
                      <button
                        style={iconBtn}
                        onClick={() => {
                          setHerramientaEdit(h);
                          setOpenEdit(true);
                        }}
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
                        onClick={() => {
                          setHerramientaDelete(h);
                          setOpenDelete(true);
                        }}
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

            {/* MODALES */}
            <CrearHerramienta
              open={openModal}
              onClose={() => setOpenModal(false)}
              onCreated={obtenerHerramientas}
            />

            <EditarHerramienta
              open={openEdit}
              onClose={() => setOpenEdit(false)}
              herramienta={herramientaEdit}
              onUpdated={obtenerHerramientas}
            />

            <EliminarHerramienta
              open={openDelete}
              onClose={() => setOpenDelete(false)}
              herramienta={herramientaDelete}
              onDeleted={obtenerHerramientas}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
