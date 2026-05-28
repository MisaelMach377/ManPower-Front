import React, { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Smartphone,
  FileSpreadsheet,
  Hash,
  Phone,
  Building2,
  ShieldCheck,
} from "lucide-react";

import CrearCelular from "./CrearCelulares";
import EditarCelular from "./EditarCelulares";
import EliminarCelular from "./EliminarCelulares";

export default function Celulares() {
  const [celulares, setCelulares] = useState([]);

  const [hoverBtn, setHoverBtn] = useState(false);
  const [hoverExcel, setHoverExcel] = useState(false);

  // MODALS
  const [openModal, setOpenModal] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);
  const [celularEdit, setCelularEdit] = useState(null);

  const [openDelete, setOpenDelete] = useState(false);
  const [celularDelete, setCelularDelete] = useState(null);

  // FILTROS
  const [fMarca, setFMarca] = useState("");
  const [fEstado, setFEstado] = useState("");

  useEffect(() => {
    obtenerCelulares();
  }, []);

  // OBTENER DATA
  const obtenerCelulares = async () => {
    try {
      const res = await fetch("https://localhost:44382/api/CelularesApi");
      const data = await res.json();
      setCelulares(data);
    } catch (err) {
      console.log(err);
    }
  };

  // FILTROS
  const filtrados = celulares.filter((c) => {
    return (
      c.marca?.toLowerCase().includes(fMarca.toLowerCase()) &&
      String(c.estado).toLowerCase().includes(fEstado.toLowerCase())
    );
  });

  // EXPORT EXCEL
  const exportarExcel = () => {
    window.open(
      "https://localhost:44382/api/CelularesApi/export/excel",
      "_blank",
    );
  };

  // ESTILOS
  const page = {
    minHeight: "100vh",
    padding: "28px",
    background: "#f8fafc",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
  };

  const container = {
    maxWidth: "1400px",
    margin: "0 auto",
  };

  const card = {
    background: "#fff",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px -1px rgba(0,0,0,0.05)",
    overflow: "hidden",
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
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const filtersBar = {
    display: "flex",
    justifyContent: "space-between",
    padding: "14px 20px",
    borderBottom: "1px solid #e2e8f0",
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
    minWidth: "200px",
  };

  const iconInside = {
    position: "absolute",
    left: "12px",
    color: "#94a3b8",
  };

  const btnExcel = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    background: hoverExcel ? "#f1f5f9" : "#fff",
    cursor: "pointer",
    fontSize: "13px",
  };

  const table = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const th = {
    textAlign: "left",
    fontSize: "11px",
    padding: "12px",
    color: "#64748b",
    borderBottom: "1px solid #e2e8f0",
    textTransform: "uppercase",
  };

  const td = {
    padding: "12px",
    fontSize: "13px",
    borderBottom: "1px solid #f1f5f9",
    color: "#334155",
  };

  const estadoBadge = (estado) => {
    const map = {
      Activo: { bg: "#dcfce7", color: "#15803d" }, // verde
      Inactivo: { bg: "#fee2e2", color: "#dc2626" }, // rojo
      Reparación: { bg: "#fef9c3", color: "#ca8a04" }, // amarillo
      Perdido: { bg: "#dbeafe", color: "#2563eb" }, // azul
    };

    const s = map[estado] || map["Inactivo"];

    return {
      padding: "4px 10px",
      borderRadius: "999px",
      fontSize: "12px",
      fontWeight: "600",
      background: s.bg,
      color: s.color,
    };
  };

  const operacionBadge = (op) => {
    const map = {
      Asignación: { bg: "#e0f2fe", color: "#0369a1" },
      Devolución: { bg: "#f3e8ff", color: "#7c3aed" },
      Cambio: { bg: "#fef3c7", color: "#b45309" },
      Baja: { bg: "#fee2e2", color: "#b91c1c" },
    };

    const s = map[op] || { bg: "#e5e7eb", color: "#374151" };

    return {
      padding: "4px 10px",
      borderRadius: "999px",
      fontSize: "12px",
      fontWeight: "600",
      background: s.bg,
      color: s.color,
    };
  };

  const iconBtn = {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    padding: "6px",
    borderRadius: "6px",
    transition: "all 0.15s ease",
  };

  return (
    <div style={page}>
      <div style={container}>
        <div style={card}>
          {/* HEADER */}
          <div style={header}>
            <div style={title}>
              <Smartphone size={18} />
              Celulares
            </div>
          </div>

          {/* FILTROS */}
          <div style={filtersBar}>
            <div style={{ display: "flex", gap: "10px" }}>
              <div style={inputWrapper}>
                <Search size={15} style={iconInside} />
                <input
                  style={input}
                  placeholder="Buscar marca..."
                  value={fMarca}
                  onChange={(e) => setFMarca(e.target.value)}
                />
              </div>

              <div style={inputWrapper}>
                <ShieldCheck size={15} style={iconInside} />
                <input
                  style={input}
                  placeholder="Estado..."
                  value={fEstado}
                  onChange={(e) => setFEstado(e.target.value)}
                />
              </div>

              <button
                onClick={exportarExcel}
                onMouseEnter={() => setHoverExcel(true)}
                onMouseLeave={() => setHoverExcel(false)}
                style={btnExcel}
              >
                <FileSpreadsheet size={15} color="#16a34a" />
                Exportar
              </button>
            </div>

            <button
              onClick={() => setOpenModal(true)}
              onMouseEnter={() => setHoverBtn(true)}
              onMouseLeave={() => setHoverBtn(false)}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "none",
                background: hoverBtn ? "#0f172a" : "#1e293b",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              <Plus size={15} /> Nuevo Celular
            </button>
          </div>

          {/* TABLE */}
          <div style={{ padding: "0 10px" }}>
            <table style={table}>
              <thead>
                <tr>
                  <th style={th}>Marca</th>
                  <th style={th}>Modelo</th>
                  <th style={th}>IMEI</th>
                  <th style={th}>Celular</th>
                  <th style={th}>Operación</th>
                  <th style={th}>Proveedor</th>
                  <th style={th}>Estado</th>
                  <th style={th}>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filtrados.map((c) => (
                  <tr key={c.id}>
                    <td style={td}>{c.marca}</td>
                    <td style={td}>{c.modelo}</td>
                    <td style={td}>{c.imei}</td>
                    <td style={td}>{c.celular}</td>
                    <td style={td}>
                      <span style={operacionBadge(c.operacion)}>
                        {c.operacion}
                      </span>
                    </td>
                    <td style={td}>{c.proveedor}</td>
                    <td style={td}>
                      <span style={estadoBadge(c.estado)}>{c.estado}</span>
                    </td>
                    <td style={{ ...td, display: "flex", gap: "6px" }}>
                      <button
                        style={iconBtn}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#e0f2fe";
                          e.currentTarget.style.transform = "scale(1.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                        onClick={() => {
                          setCelularEdit(c);
                          setOpenEdit(true);
                        }}
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        style={iconBtn}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#fee2e2";
                          e.currentTarget.style.transform = "scale(1.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                        onClick={() => {
                          setCelularDelete(c);
                          setOpenDelete(true);
                        }}
                      >
                        <Trash2 size={15} color="#dc2626" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* MODALS */}
            <CrearCelular
              open={openModal}
              onClose={() => setOpenModal(false)}
              onCreated={obtenerCelulares}
            />

            <EditarCelular
              open={openEdit}
              onClose={() => setOpenEdit(false)}
              celular={celularEdit}
              onUpdated={obtenerCelulares}
            />

            <EliminarCelular
              open={openDelete}
              onClose={() => setOpenDelete(false)}
              celular={celularDelete}
              onDeleted={obtenerCelulares}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
