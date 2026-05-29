import React, { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Hash,
  FileSpreadsheet,
} from "lucide-react";

import "./Index.css";

import CrearUsuario from "./CrearUsuario";
import EditarUsuario from "./EditarUsuario";
import EliminarUsuario from "./EliminarUsuario";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

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

  const exportarExcel = () => {
    window.open(
      "https://localhost:44382/api/UsuariosApi/export/excel",
      "_blank",
    );
  };

  return (
    <div className="usuarios-page">
      <div className="usuarios-container">
        <div className="usuarios-card">
          {/* HEADER */}
          <div className="usuarios-header">
            <h2>Usuarios</h2>
          </div>

          {/* FILTERS */}
          <div className="usuarios-filters">
            <div className="filters-left">
              <div className="input-wrapper">
                <Search size={15} className="input-icon" />

                <input
                  type="text"
                  placeholder="Buscar por apellido..."
                  value={fApellido}
                  onChange={(e) => setFApellido(e.target.value)}
                />
              </div>

              <div className="input-wrapper">
                <Hash size={15} className="input-icon" />

                <input
                  type="text"
                  placeholder="Documento..."
                  value={fDoc}
                  onChange={(e) => setFDoc(e.target.value)}
                />
              </div>

              <button className="btn-excel" onClick={exportarExcel}>
                <FileSpreadsheet size={15} />
                Exportar
              </button>
            </div>

            <button className="btn-create" onClick={() => setOpenModal(true)}>
              <Plus size={15} />
              Nuevo Usuario
            </button>
          </div>

          {/* TABLE */}
          <div className="table-wrapper">
            <table className="usuarios-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Tipo Doc</th>
                  <th>N° Doc</th>
                  <th>Correo</th>
                  <th>Celular</th>
                  <th>Estado</th>
                  <th>Creación</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filtrados.map((u) => (
                  <tr key={u.id}>
                    <td>{u.nombre}</td>
                    <td>{u.apellido}</td>
                    <td>{u.tipoDocumento}</td>
                    <td>{u.numeroDocumento}</td>
                    <td>{u.correo}</td>
                    <td>{u.celular || "-"}</td>

                    <td>
                      <span
                        className={
                          u.activo
                            ? "badge badge-active"
                            : "badge badge-inactive"
                        }
                      >
                        {u.activo ? "Activo" : "Inactivo"}
                      </span>
                    </td>

                    <td>{formatDate(u.fechaCreacion)}</td>

                    <td className="acciones">
                      <button
                        className="icon-btn"
                        onClick={() => {
                          setUsuarioEdit(u);
                          setOpenEdit(true);
                        }}
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        className="icon-btn delete"
                        onClick={() => {
                          setUsuarioDelete(u);
                          setOpenDelete(true);
                        }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
  );
}
