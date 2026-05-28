import React, { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Laptop,
  FileSpreadsheet,
  ShieldCheck,
} from "lucide-react";

import CrearLaptop from "./CrearLaptops";
import EditarLaptop from "./EditarLaptops";
import EliminarLaptop from "./EliminarLaptops";

export default function Laptops() {
  const [laptops, setLaptops] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [laptopEdit, setLaptopEdit] = useState(null);

  const [openDelete, setOpenDelete] = useState(false);
  const [laptopDelete, setLaptopDelete] = useState(null);

  const [fMarca, setFMarca] = useState("");
  const [fEstado, setFEstado] = useState("");

  const [hoverBtn, setHoverBtn] = useState(false);
  const [hoverExcel, setHoverExcel] = useState(false);

  useEffect(() => {
    obtenerLaptops();
  }, []);

  const obtenerLaptops = async () => {
    try {
      const res = await fetch("https://localhost:44382/api/LaptopsApi");
      const data = await res.json();
      setLaptops(data);
    } catch (err) {
      console.log(err);
    }
  };

  const filtrados = laptops.filter((l) => {
    return (
      l.marca?.toLowerCase().includes(fMarca.toLowerCase()) &&
      String(l.estado).toLowerCase().includes(fEstado.toLowerCase())
    );
  });

  const exportarExcel = () => {
    window.open(
      "https://localhost:44382/api/LaptopsApi/export/excel",
      "_blank",
    );
  };

  const estadoBadge = (estado) => {
    const map = {
      Activo: { bg: "#dcfce7", color: "#15803d" },
      Inactivo: { bg: "#fee2e2", color: "#dc2626" },
      Reparación: { bg: "#fef9c3", color: "#ca8a04" },
      Perdido: { bg: "#dbeafe", color: "#2563eb" },
    };

    const s = map[estado] || map.Inactivo;

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

  /* ================= UI ================= */

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

  return (
    <div style={page}>
      <div style={container}>
        <div style={card}>
          {/* HEADER */}
          <div style={header}>
            <div style={title}>
              <Laptop size={18} />
              Laptops
            </div>
          </div>

          {/* FILTERS */}
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

              <button onClick={exportarExcel} style={btnExcel}>
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
              <Plus size={15} /> Nueva Laptop
            </button>
          </div>

          {/* TABLE */}
          <div style={{ padding: "0 10px" }}>
            <table style={table}>
              <thead>
                <tr>
                  <th style={th}>Marca</th>
                  <th style={th}>Modelo</th>
                  <th style={th}>Serie</th>
                  <th style={th}>Proveedor</th>
                  <th style={th}>Observaciones</th>
                  <th style={th}>Estado</th>
                  <th style={th}>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filtrados.map((l) => (
                  <tr key={l.id}>
                    <td style={td}>{l.marca}</td>
                    <td style={td}>{l.modelo}</td>
                    <td style={td}>{l.serie}</td>
                    <td style={td}>{l.proveedor}</td>
                    <td style={td}>{l.observaciones}</td>

                    <td style={td}>
                      <span style={estadoBadge(l.estado)}>{l.estado}</span>
                    </td>

                    <td style={{ ...td, display: "flex", gap: 6 }}>
                      <button
                        style={iconBtn}
                        onClick={() => {
                          setLaptopEdit(l);
                          setOpenEdit(true);
                        }}
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        style={iconBtn}
                        onClick={() => {
                          setLaptopDelete(l);
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
            <CrearLaptop
              open={openModal}
              onClose={() => setOpenModal(false)}
              onCreated={obtenerLaptops}
            />

            <EditarLaptop
              open={openEdit}
              onClose={() => setOpenEdit(false)}
              laptop={laptopEdit}
              onUpdated={obtenerLaptops}
            />

            <EliminarLaptop
              open={openDelete}
              onClose={() => setOpenDelete(false)}
              laptop={laptopDelete}
              onDeleted={obtenerLaptops}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
