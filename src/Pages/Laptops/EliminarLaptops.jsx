import { TriangleAlert, X, Laptop } from "lucide-react";
import toast from "react-hot-toast";
import "./EliminarLaptop.css";

export default function EliminarLaptop({ open, onClose, laptop, onDeleted }) {
  if (!open) return null;

  const eliminarLaptop = async () => {
    try {
      const res = await fetch(
        `https://localhost:44382/api/LaptopsApi/${laptop.id}`,
        { method: "DELETE" },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Error eliminando laptop");
        return;
      }

      toast.success(data?.message || "Laptop eliminada 🔥");
      onDeleted();
      onClose();
    } catch (err) {
      console.log(err);
      toast.error("Error del servidor");
    }
  };

  return (
    <div className="eliminar-laptop-overlay" onClick={onClose}>
      <div
        className="eliminar-laptop-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button className="eliminar-laptop-close" onClick={onClose}>
          <X size={16} />
        </button>

        {/* ICON */}
        <div className="eliminar-laptop-icon">
          <TriangleAlert size={28} />
        </div>

        {/* TITLE */}
        <h3 className="eliminar-laptop-title">¿Eliminar esta laptop?</h3>

        <p className="eliminar-laptop-subtitle">
          Esta acción eliminará permanentemente la laptop{" "}
          <strong>
            {laptop?.marca} {laptop?.modelo}
          </strong>
          .
        </p>

        {/* INFO */}
        <div className="eliminar-laptop-info">
          <div className="eliminar-laptop-row">
            <Laptop size={14} />
            <span>{laptop?.serie}</span>
          </div>

          <div className="eliminar-laptop-badge">{laptop?.estado}</div>
        </div>

        {/* FOOTER */}
        <div className="eliminar-laptop-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancelar
          </button>

          <button className="btn-danger" onClick={eliminarLaptop}>
            Eliminar laptop
          </button>
        </div>
      </div>
    </div>
  );
}
