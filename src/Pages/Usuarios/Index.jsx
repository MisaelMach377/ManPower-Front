import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Search, Hash } from "lucide-react";
import CrearUsuario from "./CrearUsuario";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [hoverBtn, setHoverBtn] = useState(false);
  //MODAL
  const [openModal, setOpenModal] = useState(false);
  //Buscadores
  const [fApellido, setFApellido] = useState("");
  const [fDoc, setFDoc] = useState("");

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const res = await fetch("https://localhost:44382/api/UsuariosApi");
      const data = await res.json();
      setUsuarios(data);
    } catch (err) {
      console.log(err);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const filtrados = usuarios.filter((u) => {
    return (
      u.apellido?.toLowerCase().includes(fApellido.toLowerCase()) &&
      u.numeroDocumento?.toLowerCase().includes(fDoc.toLowerCase())
    );
  });

  const page = {
    minHeight: "100vh",
    padding: "28px",
    background: "#f4f6fb",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
  };

  const container = {
    maxWidth: "1300px",
    margin: "0 auto",
  };

  const card = {
    background: "#fff",
    borderRadius: "18px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    border: "1px solid #eef2f7",
    overflow: "hidden",
  };

  const header = {
    padding: "18px 20px",
    borderBottom: "1px solid #eef2f7",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const title = {
    fontSize: "20px",
    fontWeight: "700",
    color: "#0f172a",
  };

  const filtersBar = {
    display: "flex",
    justifyContent: "space-between",
    padding: "14px 20px",
    borderBottom: "1px solid #eef2f7",
    background: "#fff",
    alignItems: "center",
  };

  const inputWrapper = {
    position: "relative",
    display: "flex",
    alignItems: "center",
  };

  const input = {
    padding: "10px 12px 10px 36px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    fontSize: "13px",
    outline: "none",
    minWidth: "200px",
    background: "#fff",
  };

  const iconInside = {
    position: "absolute",
    left: "10px",
    color: "#94a3b8",
    pointerEvents: "none",
  };

  const table = {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 6px",
    padding: "10px",
  };

  const th = {
    textAlign: "left",
    fontSize: "11px",
    color: "#94a3b8",
    padding: "12px",
    textTransform: "uppercase",
  };

  const td = {
    padding: "12px",
    fontSize: "13px",
    color: "#334155",
    background: "#fff",
  };

  const btnCreate = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    background: "#fff",
    color: "#0f172a",
    fontWeight: "600",
    fontSize: "13px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  const badge = (active) => ({
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "600",
    background: active ? "#dcfce7" : "#fee2e2",
    color: active ? "#166534" : "#991b1b",
  });

  const iconBtn = {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    padding: "6px",
    borderRadius: "8px",
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
            <div style={title}>Usuarios</div>
          </div>

          {/* FILTERS */}
          <div style={filtersBar}>
            {/* IZQUIERDA (filtros) */}
            <div style={{ display: "flex", gap: "10px" }}>
              <div style={inputWrapper}>
                <Search size={16} style={iconInside} />
                <input
                  style={input}
                  placeholder="Ingresa un Apellido"
                  value={fApellido}
                  onChange={(e) => setFApellido(e.target.value)}
                />
              </div>

              <div style={inputWrapper}>
                <Hash size={16} style={iconInside} />
                <input
                  style={input}
                  placeholder="Numero de Documento"
                  value={fDoc}
                  onChange={(e) => setFDoc(e.target.value)}
                />
              </div>
            </div>

            {/* DERECHA (botón) */}
            <button
              onClick={() => setOpenModal(true)}
              onMouseEnter={() => setHoverBtn(true)}
              onMouseLeave={() => setHoverBtn(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 14px",
                borderRadius: "10px",
                border: hoverBtn ? "1px solid #cbd5e1" : "1px solid #e2e8f0",
                background: hoverBtn ? "#f8fafc" : "#fff",
                color: "#0f172a",
                fontWeight: "600",
                fontSize: "13px",
                cursor: "pointer",
                transform: hoverBtn ? "translateY(-1px)" : "translateY(0)",
                transition: "all 0.2s ease",
                marginLeft: "auto",
              }}
            >
              <Plus size={16} />
              Nuevo Usuario
            </button>
          </div>

          {/* TABLE */}
          <div style={{ padding: "10px" }}>
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
                    <td style={{ ...td, display: "flex", gap: "6px" }}>
                      <button
                        style={iconBtn}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.background = "#e0f2fe")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        <Pencil size={16} color="#2563eb" />
                      </button>

                      <button
                        style={iconBtn}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.background = "#fee2e2")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        <Trash2 size={16} color="#dc2626" />
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
          </div>
        </div>
      </div>
    </div>
  );
}
