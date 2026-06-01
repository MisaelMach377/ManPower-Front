import React, { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Smartphone,
  FileSpreadsheet,
  ShieldCheck,
  Loader2,
} from "lucide-react";

import "./IndexCelulares.css";

import CrearCelular from "./CrearCelulares";
import EditarCelular from "./EditarCelulares";
import EliminarCelular from "./EliminarCelulares";

export default function Celulares() {
  const [celulares, setCelulares] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const obtenerCelulares = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://localhost:44382/api/CelularesApi");
      const data = await res.json();
      setCelulares(data);
    } catch (err) {
      console.error("Error al obtener celulares:", err);
    } finally {
      setLoading(false);
    }
  };

  const filtrados = celulares.filter((c) => {
    return (
      (c.marca?.toLowerCase() || "").includes(fMarca.toLowerCase()) &&
      (String(c.estado || "")?.toLowerCase() || "").includes(
        fEstado.toLowerCase(),
      )
    );
  });

  const exportarExcel = () => {
    window.open(
      "https://localhost:44382/api/CelularesApi/export/excel",
      "_blank",
    );
  };

  const estadoClass = (estado) => {
    const map = {
      Activo: "badge badge-activo",
      Inactivo: "badge badge-inactivo",
      Reparación: "badge badge-reparacion",
      Perdido: "badge badge-perdido",
    };
    return map[estado] || "badge";
  };

  const operacionClass = (op) => {
    const map = {
      Asignación: "badge badge-asignacion",
      Devolución: "badge badge-devolucion",
      Cambio: "badge badge-cambio",
      Baja: "badge badge-baja",
    };
    return map[op] || "badge";
  };

  // CÁLCULOS DINÁMICOS PARA LAS MÉTRICAS DEL HERO HEADER
  const totalCelulares = celulares.length;
  const activos = celulares.filter((c) => c.estado === "Activo").length;
  const enReparacion = celulares.filter(
    (c) => c.estado === "Reparación",
  ).length;

  return (
    <div className="celulares-page">
      <div className="celulares-container">
        {/* HERO HEADER OPTIMIZADO STYLE PREMIUM ENTERPRISE */}
        <div className="page-header-premium">
          <div className="header-left-side">
            <div className="breadcrumb-tag">Experis System / Inventario</div>
            <h1>Control de Celulares</h1>
            <p className="page-subtitle">
              Monitorea el inventario de dispositivos móviles, asignaciones
              operativas y estados de red.
            </p>
          </div>

          {/* MÉTRICAS DE CONTEXTO REAL */}
          {!loading && totalCelulares > 0 && (
            <div className="header-stats-container">
              <div className="stat-pill">
                <span className="stat-label">Total Equipos</span>
                <span className="stat-value">{totalCelulares}</span>
              </div>
              <div className="stat-pill separator"></div>
              <div className="stat-pill">
                <span className="stat-label">Disponibles</span>
                <span className="stat-value active-style">{activos}</span>
              </div>
              <div className="stat-pill separator"></div>
              <div className="stat-pill">
                <span className="stat-label">En Taller</span>
                <span className="stat-value repair-style">{enReparacion}</span>
              </div>
            </div>
          )}

          <div className="header-right-side">
            <button className="btn-create" onClick={() => setOpenModal(true)}>
              <Plus size={16} />
              Nuevo Celular
            </button>
          </div>
        </div>

        {/* TARJETA PRINCIPAL DEL CONTENIDO */}
        <div className="celulares-card">
          {/* FILTROS INTEGRADOS */}
          <div className="celulares-filters">
            <div className="filters-left">
              <div className="input-wrapper">
                <Search size={16} className="input-icon" />
                <input
                  type="text"
                  className="input-system"
                  placeholder="Buscar por marca..."
                  value={fMarca}
                  onChange={(e) => setFMarca(e.target.value)}
                />
              </div>

              <div className="input-wrapper">
                <ShieldCheck size={16} className="input-icon" />
                <input
                  type="text"
                  className="input-system"
                  placeholder="Filtrar por estado..."
                  value={fEstado}
                  onChange={(e) => setFEstado(e.target.value)}
                />
              </div>
            </div>

            <button className="btn-excel" onClick={exportarExcel}>
              <FileSpreadsheet size={16} />
              Exportar a Excel
            </button>
          </div>

          {/* CUERPO DE LA TABLA Y ESTADOS DE CARGA */}
          <div className="table-wrapper">
            {loading ? (
              <div className="table-state-message">
                <Loader2 size={24} className="spinner" />
                <p>Cargando terminales del inventario...</p>
              </div>
            ) : filtrados.length === 0 ? (
              <div className="table-state-message">
                <p>
                  No se encontraron dispositivos móviles con los criterios
                  ingresados.
                </p>
              </div>
            ) : (
              <table className="celulares-table">
                <thead>
                  <tr>
                    <th>Marca / Modelo</th>
                    <th>IMEI del Terminal</th>
                    <th>N° Celular</th>
                    <th>Última Operación</th>
                    <th>Proveedor</th>
                    <th>Estado</th>
                    <th className="text-right">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {filtrados.map((c) => (
                    <tr key={c.id}>
                      <td>
                        <div className="phone-device-cell">
                          <span className="phone-avatar">
                            <Smartphone size={14} />
                          </span>
                          <div>
                            <span className="font-medium">{c.marca}</span>
                            <div className="text-sub">{c.modelo}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="text-secondary font-mono">
                          {c.imei}
                        </span>
                      </td>
                      <td>
                        <span className="text-secondary">{c.celular}</span>
                      </td>
                      <td>
                        <span className={operacionClass(c.operacion)}>
                          {c.operacion}
                        </span>
                      </td>
                      <td>
                        <span className="text-secondary">{c.proveedor}</span>
                      </td>
                      <td>
                        <span className={estadoClass(c.estado)}>
                          {c.estado}
                        </span>
                      </td>
                      <td>
                        <div className="acciones justify-end">
                          <button
                            className="icon-btn"
                            title="Editar terminal"
                            onClick={() => {
                              setCelularEdit(c);
                              setOpenEdit(true);
                            }}
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            className="icon-btn delete"
                            title="Eliminar registro"
                            onClick={() => {
                              setCelularDelete(c);
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
  );
}
