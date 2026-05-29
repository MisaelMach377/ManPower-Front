import { TriangleAlert, X } from "lucide-react";
import toast from "react-hot-toast";
import "./EliminarUsuario.css";

export default function EliminarUsuario({ open, onClose, usuario, onDeleted }) {
  if (!open) return null;

  const eliminarUsuario = async () => {
    try {
      const res = await fetch(
        `https://localhost:44382/api/UsuariosApi/${usuario.id}`,
        { method: "DELETE" },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Error eliminando");
        return;
      }

      toast.success(data?.message || "Usuario eliminado");

      onDeleted();
      onClose();
    } catch (err) {
      console.log(err);
      toast.error("Error del servidor");
    }
  };

  return (
    <div className="eliminar-overlay" onClick={onClose}>
      <div className="eliminar-modal" onClick={(e) => e.stopPropagation()}>
        {/* CLOSE */}
        <button className="eliminar-close" onClick={onClose}>
          <X size={16} />
        </button>

        {/* ICON */}
        <div className="eliminar-icon">
          <TriangleAlert size={28} />
        </div>

        {/* TITLE */}
        <h3 className="eliminar-title">¿Deseas eliminar este usuario?</h3>

        {/* SUBTITLE */}
        <p className="eliminar-subtitle">
          Esta acción eliminará permanentemente a{" "}
          <strong>
            {usuario?.nombre} {usuario?.apellido}
          </strong>
          .
        </p>

        {/* FOOTER */}
        <div className="eliminar-footer">
          <button className="eliminar-btn-secondary" onClick={onClose}>
            Cancelar
          </button>

          <button className="eliminar-btn-danger" onClick={eliminarUsuario}>
            Eliminar usuario
          </button>
        </div>
      </div>
    </div>
  );
}
