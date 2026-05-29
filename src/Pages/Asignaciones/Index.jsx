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

import "./IndexAsignaciones.css";

export default function Asignaciones() {
  const [asignaciones, setAsignaciones] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const [openDevolucion, setOpenDevolucion] = useState(false);

  const [asignacionSeleccionada, setAsignacionSeleccionada] = useState(null);

  const [fUsuario, setFUsuario] = useState("");
  const [fDocumento, setFDocumento] = useState("");

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

  const getIcon = (tipo) => {
    if (tipo === "LAPTOP") {
      return <Laptop size={15} color="#2563eb" />;
    }

    if (tipo === "CELULAR") {
      return <Smartphone size={15} color="#16a34a" />;
    }

    return <Wrench size={15} color="#c2410c" />;
  };

  const getEquipo = (a) => {
    return a.laptop || a.celular || a.herramienta || "-";
  };

  return (
    <div className="page-container">
      <div className="page-wrapper">
        <div className="page-card">
          {/* HEADER */}
          <div className="page-header">
            <div className="page-title">
              <ClipboardList size={18} />
              Asignaciones
            </div>
          </div>

          {/* FILTROS */}
          <div className="filters-bar">
            <div className="filters-left">
              <div className="input-wrapper">
                <Search size={15} className="input-icon" />

                <input
                  className="page-input"
                  placeholder="Buscar usuario..."
                  value={fUsuario}
                  onChange={(e) => setFUsuario(e.target.value)}
                />
              </div>

              <div className="input-wrapper">
                <User size={15} className="input-icon" />

                <input
                  className="page-input"
                  placeholder="Documento..."
                  value={fDocumento}
                  onChange={(e) => setFDocumento(e.target.value)}
                />
              </div>
            </div>

            <button onClick={() => setOpenModal(true)} className="btn-primary">
              <Plus size={15} />
              Nueva Asignación
            </button>
          </div>

          {/* TABLA */}
          <div className="table-container">
            <table className="page-table">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Documento</th>
                  <th>Tipo</th>
                  <th>Equipo</th>
                  <th>Guía</th>
                  <th>Zona</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                  <th>Estado Dev.</th>
                  <th>Fecha Dev.</th>
                  <th>Obs Dev.</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filtrados.map((a) => (
                  <tr key={a.id}>
                    <td>{a.usuario}</td>

                    <td>{a.documento}</td>

                    <td>
                      <span
                        className={`badge ${
                          a.tipoHerramienta === "LAPTOP"
                            ? "badge-laptop"
                            : a.tipoHerramienta === "CELULAR"
                              ? "badge-celular"
                              : "badge-herramienta"
                        }`}
                      >
                        {a.tipoHerramienta}
                      </span>
                    </td>

                    <td>
                      <div className="equipo-box">
                        {getIcon(a.tipoHerramienta)}

                        {getEquipo(a)}
                      </div>
                    </td>

                    <td>{a.numeroGuia || "-"}</td>

                    <td>{a.zona || "-"}</td>

                    <td>{a.estado}</td>

                    <td>{formatDate(a.fechaAsignacion)}</td>

                    <td>
                      <span
                        className={`badge ${
                          a.estadoDevolucion === "DEVUELTO"
                            ? "badge-devuelto"
                            : "badge-pendiente"
                        }`}
                      >
                        {a.estadoDevolucion || "PENDIENTE"}
                      </span>
                    </td>

                    <td>
                      {a.fechaDevolucion ? formatDate(a.fechaDevolucion) : "-"}
                    </td>

                    <td>{a.observacionDevolucion || "-"}</td>

                    <td>
                      <div className="actions">
                        <button className="icon-btn">
                          <Pencil size={15} />
                        </button>

                        <button className="icon-btn delete">
                          <Trash2 size={15} color="#dc2626" />
                        </button>

                        <button
                          className="icon-btn return"
                          onClick={() => {
                            setAsignacionSeleccionada(a);

                            setOpenDevolucion(true);
                          }}
                        >
                          <ClipboardList size={15} color="#2563eb" />
                        </button>
                      </div>
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
