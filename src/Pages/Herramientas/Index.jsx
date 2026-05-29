import React, { useEffect, useState } from "react";

import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Package,
  FileSpreadsheet,
} from "lucide-react";
import "./IndexHerramientas.css";

import CrearHerramienta from "./CrearHerramienta";
import EditarHerramienta from "./EditarHerramienta";
import EliminarHerramienta from "./EliminarHerramienta";

export default function Herramientas() {
  const [herramientas, setHerramientas] = useState([]);

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

  // EXPORTAR
  const exportarExcel = () => {
    window.open(
      "https://localhost:44382/api/HerramientasApi/export/excel",
      "_blank",
    );
  };

  return (
    <div className="herramientas-page">
      <div className="herramientas-container">
        <div className="herramientas-card">
          {/* HEADER */}

          <div className="herramientas-header">
            <div className="herramientas-title">Herramientas</div>
          </div>

          {/* FILTROS */}

          <div className="herramientas-filters">
            <div className="filters-left">
              {/* BUSCAR */}

              <div className="input-wrapper">
                <Search size={15} className="input-icon" />

                <input
                  className="input-system"
                  placeholder="Buscar herramienta..."
                  value={fDescripcion}
                  onChange={(e) => setFDescripcion(e.target.value)}
                />
              </div>

              {/* CATEGORIA */}

              <div className="input-wrapper">
                <Package size={15} className="input-icon" />

                <input
                  className="input-system"
                  placeholder="Categoría..."
                  value={fCategoria}
                  onChange={(e) => setFCategoria(e.target.value)}
                />
              </div>

              {/* EXPORTAR */}

              <button className="btn-system btn-excel" onClick={exportarExcel}>
                <FileSpreadsheet size={15} />

                <span>Exportar</span>
              </button>
            </div>

            {/* CREAR */}

            <button
              className="btn-system btn-create"
              onClick={() => setOpenModal(true)}
            >
              <Plus size={15} />
              Nueva Herramienta
            </button>
          </div>

          {/* TABLA */}

          <div className="table-wrapper">
            <table className="herramientas-table">
              <thead>
                <tr>
                  <th>Descripción</th>
                  <th>Unidad</th>
                  <th>Familia</th>
                  <th>Stock</th>
                  <th>Precio</th>
                  <th>Categoría</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filtrados.map((h) => (
                  <tr key={h.id}>
                    <td>{h.descripcion}</td>

                    <td>
                      <span className="badge-unidad">
                        {h.unidadMedida || "Sin unidad"}
                      </span>
                    </td>

                    <td>{h.familia || "-"}</td>

                    <td>{h.stock}</td>

                    <td>
                      <div className="precio-box">
                        <span className="precio-label">PEN</span>

                        <span>S/ {Number(h.precio).toFixed(2)}</span>
                      </div>
                    </td>

                    <td>{h.categoria}</td>

                    <td>
                      <span
                        className={
                          h.estado
                            ? "badge badge-active"
                            : "badge badge-inactive"
                        }
                      >
                        {h.estado ? "Activo" : "Inactivo"}
                      </span>
                    </td>

                    {/* ACCIONES */}

                    <td className="actions">
                      <button
                        className="icon-btn"
                        onClick={() => {
                          setHerramientaEdit(h);
                          setOpenEdit(true);
                        }}
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        className="icon-btn delete"
                        onClick={() => {
                          setHerramientaDelete(h);
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
