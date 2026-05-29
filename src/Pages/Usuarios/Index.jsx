import React, { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Hash,
  FileSpreadsheet,
  Loader2,
} from "lucide-react";

import "./Index.css";

import CrearUsuario from "./CrearUsuario";
import EditarUsuario from "./EditarUsuario";
import EliminarUsuario from "./EliminarUsuario";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  // MODALS
  const [openModal, setOpenModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [usuarioEdit, setUsuarioEdit] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [usuarioDelete, setUsuarioDelete] = useState(null);

  // FILTROS
  const [fApellido, setFApellido] = useState("");
  const [fDoc, setFDoc] = useState("");

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://localhost:44382/api/UsuariosApi");
      const data = await res.json();
      setUsuarios(data);
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "—";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    return `${day}/${month}/${d.getFullYear()}`;
  };

  const filtrados = usuarios.filter((u) => {
    return (
      (u.apellido?.toLowerCase() || "").includes(fApellido.toLowerCase()) &&
      (u.numeroDocumento?.toLowerCase() || "").includes(fDoc.toLowerCase())
    );
  });

  const exportarExcel = () => {
    window.open(
      "https://localhost:44382/api/UsuariosApi/export/excel",
      "_blank",
    );
  };

  // CÁLCULOS DINÁMICOS PARA LAS MÉTRICAS DEL HEADER
  const totalUsuarios = usuarios.length;
  const activos = usuarios.filter((u) => u.activo).length;
  const inactivos = totalUsuarios - activos;

  return (
    <div className="usuarios-page">
      <div className="usuarios-container">
        {/* HEADER OPTIMIZADO STYLE PREMIUM ENTERPRISE */}
        <div className="page-header-premium">
          <div className="header-left-side">
            <div className="breadcrumb-tag">Experis System / Usuarios</div>
            <h1>Gestión de Usuarios</h1>
            <p className="page-subtitle">
              Administra los accesos, roles y credenciales del personal de
              Experis.
            </p>
          </div>

          {/* MÉTRICAS DE CONTEXTO REAL (Solo se muestran si ya cargó la data) */}
          {!loading && totalUsuarios > 0 && (
            <div className="header-stats-container">
              <div className="stat-pill">
                <span className="stat-label">Total</span>
                <span className="stat-value">{totalUsuarios}</span>
              </div>
              <div className="stat-pill separator"></div>
              <div className="stat-pill">
                <span className="stat-label">Activos</span>
                <span className="stat-value active-style">{activos}</span>
              </div>
              <div className="stat-pill separator"></div>
              <div className="stat-pill">
                <span className="stat-label">Inactivos</span>
                <span className="stat-value inactive-style">{inactivos}</span>
              </div>
            </div>
          )}

          <div className="header-right-side">
            <button className="btn-create" onClick={() => setOpenModal(true)}>
              <Plus size={16} />
              Nuevo Usuario
            </button>
          </div>
        </div>

        <div className="usuarios-card">
          {/* FILTERS */}
          <div className="usuarios-filters">
            <div className="filters-left">
              <div className="input-wrapper">
                <Search size={16} className="input-icon" />
                <input
                  type="text"
                  placeholder="Buscar por apellido..."
                  value={fApellido}
                  onChange={(e) => setFApellido(e.target.value)}
                />
              </div>

              <div className="input-wrapper">
                <Hash size={16} className="input-icon" />
                <input
                  type="text"
                  placeholder="N° de Documento..."
                  value={fDoc}
                  onChange={(e) => setFDoc(e.target.value)}
                />
              </div>
            </div>

            <button className="btn-excel" onClick={exportarExcel}>
              <FileSpreadsheet size={16} />
              Exportar a Excel
            </button>
          </div>

          {/* TABLE CONTENT */}
          <div className="table-wrapper">
            {loading ? (
              <div className="table-state-message">
                <Loader2 size={24} className="spinner" />
                <p>Cargando registros de la plataforma...</p>
              </div>
            ) : filtrados.length === 0 ? (
              <div className="table-state-message">
                <p>No se encontraron usuarios con los criterios de búsqueda.</p>
              </div>
            ) : (
              <table className="usuarios-table">
                <thead>
                  <tr>
                    <th>Nombre completo</th>
                    <th>Tipo / N° Doc</th>
                    <th>Correo Electrónico</th>
                    <th>Celular</th>
                    <th>Estado</th>
                    <th>Fecha Registro</th>
                    <th className="text-right">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {filtrados.map((u) => (
                    <tr key={u.id}>
                      <td>
                        <div className="user-name-cell">
                          <span className="user-avatar">
                            {u.nombre?.charAt(0)}
                            {u.apellido?.charAt(0)}
                          </span>
                          <div>
                            <span className="font-medium">
                              {u.nombre} {u.apellido}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="text-secondary">
                          {u.tipoDocumento}
                        </span>
                        <div className="text-sub">{u.numeroDocumento}</div>
                      </td>
                      <td>
                        <span className="text-secondary">{u.correo}</span>
                      </td>
                      <td>
                        <span className="text-secondary">
                          {u.celular || "—"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${u.activo ? "badge-active" : "badge-inactive"}`}
                        >
                          {u.activo ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td>
                        <span className="text-secondary">
                          {formatDate(u.fechaCreacion)}
                        </span>
                      </td>
                      <td>
                        <div className="acciones justify-end">
                          <button
                            className="icon-btn"
                            title="Editar usuario"
                            onClick={() => {
                              setUsuarioEdit(u);
                              setOpenEdit(true);
                            }}
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            className="icon-btn delete"
                            title="Eliminar usuario"
                            onClick={() => {
                              setUsuarioDelete(u);
                              setOpenDelete(true);
                            }}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
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
  );
}
