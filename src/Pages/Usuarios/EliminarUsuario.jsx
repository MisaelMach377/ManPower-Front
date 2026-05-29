import React, { useState } from "react";
import { X, TriangleAlert, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import "./EliminarUsuario.css";

export default function EliminarUsuario({ open, onClose, usuario, onDeleted }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!open) return null;

  const eliminarUsuario = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const res = await fetch(
        `https://localhost:44382/api/UsuariosApi/${usuario?.id}`,
        {
          method: "DELETE",
        },
      );

      const data = res.headers.get("content-type")?.includes("application/json")
        ? await res.json()
        : null;

      if (!res.ok) {
        toast.error(data?.message || "Error al eliminar");
        return;
      }

      toast.success(data?.message || "Usuario eliminado correctamente");
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
        {/* Close Button Superior */}
        <button
          className="pro-close-btn pos-absolute"
          onClick={onClose}
          title="Cancelar"
        >
          <X size={14} />
        </button>

        <div className="pro-alert-body">
          {/* Icono Destructivo Sutil */}
          <div className="pro-alert-icon-wrapper">
            <TriangleAlert size={16} />
          </div>

          {/* Contenido */}
          <div className="pro-alert-content">
            <h3 className="pro-modal-title">¿Eliminar este usuario?</h3>
            <p className="pro-modal-subtitle">
              Esta acción revocará de manera permanente todos los accesos de{" "}
              <span className="pro-highlight-text">
                {usuario?.nombre} {usuario?.apellido}
              </span>{" "}
              en el sistema. No se puede deshacer.
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
            onClick={eliminarUsuario}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={13} className="pro-spinner" />
                <span>Eliminando...</span>
              </>
            ) : (
              "Eliminar cuenta"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
