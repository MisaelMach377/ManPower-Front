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

import "./IndexLaptops.css";

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

  const estadoClass = (estado) => {
    const map = {
      Activo: "badge badge-activo",
      Inactivo: "badge badge-inactivo",
      Reparación: "badge badge-reparacion",
      Perdido: "badge badge-perdido",
    };

    return map[estado] || "badge";
  };

  return (
    <div className="laptops-page">
      <div className="laptops-container">
        <div className="laptops-card">
          {/* HEADER */}

          <div className="laptops-header">
            <div className="laptops-title">
              <Laptop size={18} />
              Laptops
            </div>
          </div>

          {/* FILTERS */}

          <div className="laptops-filters">
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
              Nueva Laptop
            </button>
          </div>

          {/* TABLA */}

          <div className="table-wrapper">
            <table className="laptops-table">
              <thead>
                <tr>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Serie</th>
                  <th>Proveedor</th>
                  <th>Observaciones</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filtrados.map((l) => (
                  <tr key={l.id}>
                    <td>{l.marca}</td>

                    <td>{l.modelo}</td>

                    <td>{l.serie}</td>

                    <td>{l.proveedor}</td>

                    <td>{l.observaciones}</td>

                    <td>
                      <span className={estadoClass(l.estado)}>{l.estado}</span>
                    </td>

                    <td className="actions">
                      <button
                        className="icon-btn"
                        onClick={() => {
                          setLaptopEdit(l);
                          setOpenEdit(true);
                        }}
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        className="icon-btn delete"
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

            {/* MODALES */}

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
