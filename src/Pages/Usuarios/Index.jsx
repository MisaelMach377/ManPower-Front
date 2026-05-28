import React, { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Hash,
  FileSpreadsheet,
} from "lucide-react";
import CrearUsuario from "./CrearUsuario";
import EditarUsuario from "./EditarUsuario";
import EliminarUsuario from "./EliminarUsuario";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [hoverBtn, setHoverBtn] = useState(false);
  const [hoverExcel, setHoverExcel] = useState(false); // Estado para el hover minimalista
  //MODAL
  const [openModal, setOpenModal] = useState(false);
  //ABRIR EDITAR USUARIO
  const [openEdit, setOpenEdit] = useState(false);
  const [usuarioEdit, setUsuarioEdit] = useState(null);
  //ABRIR ELIMINAR USUARIO
  const [openDelete, setOpenDelete] = useState(false);
  const [usuarioDelete, setUsuarioDelete] = useState(null);
  //Buscadores
  const [fApellido, setFApellido] = useState("");
  const [fDoc, setFDoc] = useState("");

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  //OBTENER USUARIOS
  const obtenerUsuarios = async () => {
    try {
      const res = await fetch("https://localhost:44382/api/UsuariosApi");
      const data = await res.json();
      setUsuarios(data);
    } catch (err) {
      console.log(err);
    }
  };

  //FORMATEAR FECHA
  const formatDate = (date) => {
    if (!date) return "-";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  //FILTRAR USUARIOS
  const filtrados = usuarios.filter((u) => {
    return (
      u.apellido?.toLowerCase().includes(fApellido.toLowerCase()) &&
      u.numeroDocumento?.toLowerCase().includes(fDoc.toLowerCase())
    );
  });

  //EXPORTAR EXCEL
  const exportarExcel = () => {
    window.open(
      "https://localhost:44382/api/UsuariosApi/export/excel",
      "_blank",
    );
  };

  // --- ESTILOS EN OBJETOS ---
  const page = {
    minHeight: "100vh",
    padding: "28px",
    background: "#f8fafc", // Un gris más limpio y moderno
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
  };

  const container = {
    maxWidth: "1300px",
    margin: "0 auto",
  };

  const card = {
    background: "#fff",
    borderRadius: "12px", // Bordes un poco más finos son más pro
    boxShadow:
      "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)", // Sombra sutil de diseño moderno
    border: "1px solid #e2e8f0",
    overflow: "hidden",
  };

  const header = {
    padding: "18px 20px",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    justify: "space-between",
    alignItems: "center",
  };

  const title = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#0f172a",
  };

  const filtersBar = {
    display: "flex",
    justify: "space-between",
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
    minWidth: "200px",
    background: "#fff",
    color: "#334155",
  };

  const iconInside = {
    position: "absolute",
    left: "12px",
    color: "#94a3b8",
    pointerEvents: "none",
  };

  // BOTÓN EXCEL MINIMALISTA Y PRO
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
    padding: "10px",
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
    justify: "center",
    transition: "background 0.2s",
  };

  return (
    <div style={page}>
      <div style={container}>
        <div style={card}>
          {/* HEADER */}
          <div style={header}>
            <div style={title}>Usuarios</div>
          </div>

          {/* FILTERS */}
          <div style={filtersBar}>
            {/* IZQUIERDA (filtros + excel) */}
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <div style={inputWrapper}>
                <Search size={15} style={iconInside} />
                <input
                  style={input}
                  placeholder="Buscar por apellido..."
                  value={fApellido}
                  onChange={(e) => setFApellido(e.target.value)}
                />
              </div>
              <div style={inputWrapper}>
                <Hash size={15} style={iconInside} />
                <input
                  style={input}
                  placeholder="Documento..."
                  value={fDoc}
                  onChange={(e) => setFDoc(e.target.value)}
                />
              </div>

              {/* BOTÓN EXCEL MODIFICADO */}
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

            {/* DERECHA (botón crear) */}
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
              Nuevo Usuario
            </button>
          </div>

          {/* TABLE */}
          <div style={{ padding: "0 10px" }}>
            <table style={table}>
              <thead>
                <tr>
                  <th style={th}>Nombre</th>
                  <th style={th}>Apellido</th>
                  <th style={th}>Tipo Doc</th>
                  <th style={th}>N° Doc</th>
                  <th style={th}>Correo</th>
                  <th style={th}>Celular</th>
                  <th style={th}>Estado</th>
                  <th style={th}>Creación</th>
                  <th style={th}>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filtrados.map((u) => (
                  <tr key={u.id}>
                    <td style={td}>{u.nombre}</td>
                    <td style={td}>{u.apellido}</td>
                    <td style={td}>{u.tipoDocumento}</td>
                    <td style={td}>{u.numeroDocumento}</td>
                    <td style={td}>{u.correo}</td>
                    <td style={td}>{u.celular || "-"}</td>

                    <td style={td}>
                      <span style={badge(u.activo)}>
                        {u.activo ? "Activo" : "Inactivo"}
                      </span>
                    </td>

                    <td style={td}>{formatDate(u.fechaCreacion)}</td>

                    {/* ACCIONES */}
                    <td style={{ ...td, display: "flex", gap: "4px" }}>
                      <button
                        style={iconBtn}
                        onClick={() => {
                          setUsuarioEdit(u);
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
                          setUsuarioDelete(u);
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

            <CrearUsuario
              open={openModal}
              onClose={() => setOpenModal(false)}
              onCreated={obtenerUsuarios}
            />

            <EditarUsuario
              open={openEdit}
              onClose={() => setOpenEdit(false)}
              usuario={usuarioEdit}
              onUpdated={obtenerUsuarios}
            />

            <EliminarUsuario
              open={openDelete}
              onClose={() => setOpenDelete(false)}
              usuario={usuarioDelete}
              onDeleted={obtenerUsuarios}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
