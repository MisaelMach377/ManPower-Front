import { TriangleAlert, X, Wrench } from "lucide-react";
import toast from "react-hot-toast";
import "./EliminarHerramienta.css";

export default function EliminarHerramienta({
  open,
  onClose,
  herramienta,
  onDeleted,
}) {
  if (!open) return null;

  const eliminarHerramienta = async () => {
    try {
      const res = await fetch(
        `https://localhost:44382/api/HerramientasApi/${herramienta.id}`,
        { method: "DELETE" },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Error eliminando");
        return;
      }

      toast.success(data?.message || "Herramienta eliminada");

      onDeleted();
      onClose();
    } catch (err) {
      console.log(err);
      toast.error("Error del servidor");
    }
  };

  return (
    <div className="eliminar-herramienta-overlay" onClick={onClose}>
      <div
        className="eliminar-herramienta-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button className="eliminar-herramienta-close" onClick={onClose}>
          <X size={16} />
        </button>

        {/* ICON */}
        <div className="eliminar-herramienta-icon">
          <TriangleAlert size={28} />
        </div>

        {/* TITLE */}
        <h3 className="eliminar-herramienta-title">
          ¿Deseas eliminar esta herramienta?
        </h3>

        {/* SUBTITLE */}
        <p className="eliminar-herramienta-subtitle">
          Esta acción eliminará permanentemente{" "}
          <strong>{herramienta?.descripcion}</strong>.
        </p>

        {/* INFO */}
        <div className="eliminar-herramienta-info">
          <div className="eliminar-herramienta-row">
            <Wrench size={14} />
            <span>{herramienta?.categoria || "Sin categoría"}</span>
          </div>

          <div className="eliminar-herramienta-stock">
            Stock: {herramienta?.stock}
          </div>
        </div>

        {/* FOOTER */}
        <div className="eliminar-herramienta-footer">
          <button
            className="eliminar-herramienta-btn-secondary"
            onClick={onClose}
          >
            Cancelar
          </button>

          <button
            className="eliminar-herramienta-btn-danger"
            onClick={eliminarHerramienta}
          >
            Eliminar herramienta
          </button>
        </div>
      </div>
    </div>
  );
}
