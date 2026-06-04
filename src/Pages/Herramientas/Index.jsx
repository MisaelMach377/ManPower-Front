import React, { useEffect, useState, useRef } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Package,
  FileSpreadsheet,
  Loader2,
  Upload,
} from "lucide-react";

import "./IndexHerramientas.css";

import CrearHerramienta from "./CrearHerramienta";
import EditarHerramienta from "./EditarHerramienta";
import EliminarHerramienta from "./EliminarHerramienta";

export default function Herramientas() {
  const [herramientas, setHerramientas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  //PAGINACION
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 25;

  // MODALS
  const [openModal, setOpenModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [herramientaEdit, setHerramientaEdit] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [herramientaDelete, setHerramientaDelete] = useState(null);

  // FILTROS
  const [fDescripcion, setFDescripcion] = useState("");
  const [fCategoria, setFCategoria] = useState("");

  //IMPORTAR EXCEL
  const fileInputRef = useRef(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  //Obtener herramientas al cargar la página
  useEffect(() => {
    obtenerHerramientas();
  }, []);

  const obtenerHerramientas = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://localhost:44382/api/HerramientasApi");
      const data = await res.json();
      setHerramientas(data);
    } catch (err) {
      console.error("Error al obtener herramientas:", err);
    } finally {
      setLoading(false);
    }
  };

  //importar excel
  const handleImportExcel = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setImporting(true);

      const res = await fetch(
        "https://localhost:44382/api/HerramientasApi/import/excel",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert(
        `Importación completada 🔥\nInsertados: ${data.insertados}\nErrores: ${data.errores?.length || 0}`,
      );

      obtenerHerramientas();
    } catch (error) {
      console.error(error);
      alert("Error al importar Excel");
    } finally {
      setImporting(false);
      e.target.value = "";
    }
  };

  //filtrros
  const filtrados = herramientas.filter((h) => {
    return (
      (h.descripcion?.toLowerCase() || "").includes(
        fDescripcion.toLowerCase(),
      ) && (h.categoria?.toLowerCase() || "").includes(fCategoria.toLowerCase())
    );
  });

  //Paginacion
  const indiceUltimo = paginaActual * registrosPorPagina;
  const indicePrimero = indiceUltimo - registrosPorPagina;

  const herramientasPagina = filtrados.slice(indicePrimero, indiceUltimo);

  const totalPaginas = Math.ceil(filtrados.length / registrosPorPagina);

  const exportarExcel = () => {
    window.open(
      "https://localhost:44382/api/HerramientasApi/export/excel",
      "_blank",
    );
  };

  // CÁLCULOS DINÁMICOS PARA LAS MÉTRICAS DEL HEADER (Estilo Usuarios)
  const totalHerramientas = herramientas.length;
  const activas = herramientas.filter((h) => h.estado).length;
  const inactivas = totalHerramientas - activas;

  return (
    <div className="herramientas-page">
      <div className="herramientas-container">
        {/* HEADER OPTIMIZADO STYLE PREMIUM ENTERPRISE */}
        <div className="page-header-premium">
          <div className="header-left-side">
            <div className="breadcrumb-tag">Experis System / Herramientas</div>
            <h1>Gestión de Herramientas</h1>
            <p className="page-subtitle">
              Administra el stock, unidades de medida y estados de herramientas
              e insumos de Experis.
            </p>
          </div>

          {/* MÉTRICAS DE CONTEXTO REAL */}
          {!loading && totalHerramientas > 0 && (
            <div className="header-stats-container">
              <div className="stat-pill">
                <span className="stat-label">Total Items</span>
                <span className="stat-value">{totalHerramientas}</span>
              </div>
              <div className="stat-pill separator"></div>
              <div className="stat-pill">
                <span className="stat-label">Disponibles</span>
                <span className="stat-value active-style">{activas}</span>
              </div>
              <div className="stat-pill separator"></div>
              <div className="stat-pill">
                <span className="stat-label">Inactivas</span>
                <span className="stat-value inactive-style">{inactivas}</span>
              </div>
            </div>
          )}

          <div className="header-right-side">
            <div className="header-actions">
              <button
                className="btn-import"
                onClick={handleImportClick}
                disabled={importing}
                title="Importar Excel"
              >
                {importing ? (
                  <Loader2 size={16} className="spinner" />
                ) : (
                  <Upload size={16} />
                )}
              </button>

              <button className="btn-create" onClick={() => setOpenModal(true)}>
                <Plus size={16} />
                Nueva Herramienta
              </button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              accept=".xlsx,.xls"
              style={{ display: "none" }}
              onChange={handleImportExcel}
            />
          </div>
        </div>

        <div className="herramientas-card">
          {/* FILTERS */}
          <div className="herramientas-filters">
            <div className="filters-left">
              <div className="input-wrapper">
                <Search size={16} className="input-icon" />
                <input
                  type="text"
                  placeholder="Buscar por descripción..."
                  value={fDescripcion}
                  onChange={(e) => {
                    setFDescripcion(e.target.value);
                    setPaginaActual(1);
                  }}
                />
              </div>

              <div className="input-wrapper">
                <Package size={16} className="input-icon" />
                <input
                  type="text"
                  placeholder="Categoría..."
                  value={fCategoria}
                  onChange={(e) => {
                    setFCategoria(e.target.value);
                    setPaginaActual(1);
                  }}
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
                <p>Cargando inventario de la plataforma...</p>
              </div>
            ) : filtrados.length === 0 ? (
              <div className="table-state-message">
                <p>
                  No se encontraron herramientas con los criterios de búsqueda.
                </p>
              </div>
            ) : (
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
                    <th className="text-right">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {herramientasPagina.map((h) => (
                    <tr key={h.id}>
                      <td>
                        <div className="tool-name-cell">
                          <span className="tool-avatar">
                            {h.descripcion?.charAt(0)}
                          </span>
                          <div>
                            <span className="font-medium">{h.descripcion}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge-unidad">
                          {h.unidadMedida || "Sin unidad"}
                        </span>
                      </td>
                      <td>
                        <span className="text-secondary">
                          {h.familia || "—"}
                        </span>
                      </td>
                      <td>
                        <span className="font-mono">{h.stock}</span>
                      </td>
                      <td>
                        <div className="precio-box">
                          <span className="precio-label">S/</span>
                          <span className="font-medium">
                            {Number(h.precio || 0).toFixed(2)}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="text-secondary">{h.categoria}</span>
                      </td>
                      <td>
                        <span
                          className={`badge ${h.estado ? "badge-active" : "badge-inactive"}`}
                        >
                          {h.estado ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td>
                        <div className="acciones justify-end">
                          <button
                            className="icon-btn"
                            title="Editar herramienta"
                            onClick={() => {
                              setHerramientaEdit(h);
                              setOpenEdit(true);
                            }}
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            className="icon-btn delete"
                            title="Eliminar herramienta"
                            onClick={() => {
                              setHerramientaDelete(h);
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

          {totalPaginas > 1 && (
            <div className="pagination">
              <button
                disabled={paginaActual === 1}
                onClick={() => setPaginaActual((p) => p - 1)}
              >
                Anterior
              </button>

              <span className="pagination-info">
                Página {paginaActual} de {totalPaginas}
              </span>

              <button
                disabled={paginaActual === totalPaginas}
                onClick={() => setPaginaActual((p) => p + 1)}
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
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
  );
}
