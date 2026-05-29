import { TriangleAlert, X, Smartphone } from "lucide-react";
import toast from "react-hot-toast";
import "./EliminarCelular.css";

export default function EliminarCelular({ open, onClose, celular, onDeleted }) {
  if (!open) return null;

  const eliminarCelular = async () => {
    try {
      const res = await fetch(
        `https://localhost:44382/api/CelularesApi/${celular.id}`,
        { method: "DELETE" },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Error eliminando celular");
        return;
      }

      toast.success(data?.message || "Celular eliminado 🔥");
      onDeleted();
      onClose();
    } catch (err) {
      console.log(err);
      toast.error("Error del servidor");
    }
  };

  return (
    <div className="eliminar-celular-overlay" onClick={onClose}>
      <div
        className="eliminar-celular-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button className="eliminar-celular-close" onClick={onClose}>
          <X size={16} />
        </button>

        {/* ICON */}
        <div className="eliminar-celular-icon">
          <TriangleAlert size={28} />
        </div>

        {/* TITLE */}
        <h3 className="eliminar-celular-title">¿Eliminar este celular?</h3>

        <p className="eliminar-celular-subtitle">
          Esta acción eliminará permanentemente el celular{" "}
          <strong>
            {celular?.marca} {celular?.modelo}
          </strong>
          .
        </p>

        {/* INFO */}
        <div className="eliminar-celular-info">
          <div className="eliminar-celular-row">
            <Smartphone size={14} />
            <span>{celular?.marca}</span>
          </div>

          <div className="eliminar-celular-badge">IMEI: {celular?.imei}</div>
        </div>

        {/* FOOTER */}
        <div className="eliminar-celular-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancelar
          </button>

          <button className="btn-danger" onClick={eliminarCelular}>
            Eliminar celular
          </button>
        </div>
      </div>
    </div>
  );
}
