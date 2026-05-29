import React, { useState } from "react";
import { X, TriangleAlert, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import "./EliminarHerramienta.css";

export default function EliminarHerramienta({
  open,
  onClose,
  herramienta,
  onDeleted,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!open) return null;

  const eliminarHerramienta = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const res = await fetch(
        `https://localhost:44382/api/HerramientasApi/${herramienta?.id}`,
        {
          method: "DELETE",
        },
      );

      const data = res.headers.get("content-type")?.includes("application/json")
        ? await res.json()
        : null;

      if (!res.ok) {
        toast.error(data?.message || "Error al eliminar la herramienta");
        return;
      }

      toast.success(data?.message || "Herramienta eliminada correctamente");
      onDeleted();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Error de conexión con el servidor");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pro-modal-overlay" onClick={onClose}>
      <div
        className="pro-modal-card alert-width"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón Cerrar Superior */}
        <button
          className="pro-close-btn pos-absolute"
          onClick={onClose}
          title="Cancelar"
        >
          <X size={14} />
        </button>

        <div className="pro-alert-body">
          {/* Icono Destructivo Premium */}
          <div className="pro-alert-icon-wrapper">
            <TriangleAlert size={16} />
          </div>

          {/* Contenido del Mensaje */}
          <div className="pro-alert-content">
            <h3 className="pro-modal-title">¿Eliminar esta herramienta?</h3>
            <p className="pro-modal-subtitle">
              Esta acción eliminará de forma permanente el registro de{" "}
              <span className="pro-highlight-text">
                {herramienta?.descripcion}
              </span>{" "}
              del inventario. No se puede deshacer.
            </p>
          </div>
        </div>

        {/* Footer Acoplado */}
        <div className="pro-modal-footer padding-alert">
          <button
            className="pro-btn pro-btn-secondary"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancelar
          </button>
          <button
            className="pro-btn pro-btn-danger"
            onClick={eliminarHerramienta}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={13} className="pro-spinner" />
                <span>Eliminando...</span>
              </>
            ) : (
              "Eliminar herramienta"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
