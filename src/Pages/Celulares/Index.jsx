import React, { useEffect, useState } from "react";

import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Smartphone,
  FileSpreadsheet,
  ShieldCheck,
} from "lucide-react";

import "./IndexCelulares.css";

import CrearCelular from "./CrearCelulares";
import EditarCelular from "./EditarCelulares";
import EliminarCelular from "./EliminarCelulares";

export default function Celulares() {
  const [celulares, setCelulares] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);
  const [celularEdit, setCelularEdit] = useState(null);

  const [openDelete, setOpenDelete] = useState(false);
  const [celularDelete, setCelularDelete] = useState(null);

  const [fMarca, setFMarca] = useState("");
  const [fEstado, setFEstado] = useState("");

  useEffect(() => {
    obtenerCelulares();
  }, []);

  const obtenerCelulares = async () => {
    try {
      const res = await fetch("https://localhost:44382/api/CelularesApi");

      const data = await res.json();

      setCelulares(data);
    } catch (err) {
      console.log(err);
    }
  };

  const filtrados = celulares.filter((c) => {
    return (
      c.marca?.toLowerCase().includes(fMarca.toLowerCase()) &&
      String(c.estado).toLowerCase().includes(fEstado.toLowerCase())
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

  return (
    <div className="celulares-page">
      <div className="celulares-container">
        <div className="celulares-card">
          {/* HEADER */}

          <div className="celulares-header">
            <div className="celulares-title">
              <Smartphone size={18} />
              Celulares
            </div>
          </div>

          {/* FILTERS */}

          <div className="celulares-filters">
            <div className="filters-left">
              <div className="input-wrapper">
                <Search size={15} className="input-icon" />

                <input
                  className="input-system"
                  placeholder="Buscar marca..."
                  value={fMarca}
                  onChange={(e) => setFMarca(e.target.value)}
                />
              </div>

              <div className="input-wrapper">
                <ShieldCheck size={15} className="input-icon" />

                <input
                  className="input-system"
                  placeholder="Estado..."
                  value={fEstado}
                  onChange={(e) => setFEstado(e.target.value)}
                />
              </div>

              <button className="btn-system btn-excel" onClick={exportarExcel}>
                <FileSpreadsheet size={15} color="#16a34a" />
                Exportar
              </button>
            </div>

            <button
              className="btn-system btn-create"
              onClick={() => setOpenModal(true)}
            >
              <Plus size={15} />
              Nuevo Celular
            </button>
          </div>

          {/* TABLA */}

          <div className="table-wrapper">
            <table className="celulares-table">
              <thead>
                <tr>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>IMEI</th>
                  <th>Celular</th>
                  <th>Operación</th>
                  <th>Proveedor</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filtrados.map((c) => (
                  <tr key={c.id}>
                    <td>{c.marca}</td>
                    <td>{c.modelo}</td>
                    <td>{c.imei}</td>
                    <td>{c.celular}</td>

                    <td>
                      <span className={operacionClass(c.operacion)}>
                        {c.operacion}
                      </span>
                    </td>

                    <td>{c.proveedor}</td>

                    <td>
                      <span className={estadoClass(c.estado)}>{c.estado}</span>
                    </td>

                    <td className="actions">
                      <button
                        className="icon-btn"
                        onClick={() => {
                          setCelularEdit(c);
                          setOpenEdit(true);
                        }}
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        className="icon-btn delete"
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
