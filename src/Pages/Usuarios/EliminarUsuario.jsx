import { TriangleAlert, X } from "lucide-react";
import toast from "react-hot-toast";

export default function EliminarUsuario({ open, onClose, usuario, onDeleted }) {
  if (!open) return null;

  const eliminarUsuario = async () => {
    try {
      const res = await fetch(
        `https://localhost:44382/api/UsuariosApi/${usuario.id}`,
        {
          method: "DELETE",
        },
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
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {/* BOTON X */}
        <button style={closeBtnStyle} onClick={onClose}>
          <X size={16} />
        </button>

        {/* ICON */}
        <div style={iconContainer}>
          <TriangleAlert size={28} />
        </div>

        {/* TITULO */}
        <h3 style={titleStyle}>¿Deseas eliminar este usuario?</h3>

        {/* SUBTITLE */}
        <p style={subtitleStyle}>
          Esta acción eliminará permanentemente a{" "}
          <strong>
            {usuario?.nombre} {usuario?.apellido}
          </strong>
          .
        </p>

        {/* BOTONES */}
        <div style={footerStyle}>
          <button style={btnSecondaryStyle} onClick={onClose}>
            Cancelar
          </button>

          <button style={btnDangerStyle} onClick={eliminarUsuario}>
            Eliminar usuario
          </button>
        </div>
      </div>
    </div>
  );
}

/* ESTILOS */

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.15)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backdropFilter: "blur(4px)",
  zIndex: 1000,
};

const modalStyle = {
  width: "100%",
  maxWidth: "420px",
  background: "#fff",
  borderRadius: "16px",
  padding: "28px",
  position: "relative",
  boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
  border: "1px solid #e5e7eb",
};

const closeBtnStyle = {
  position: "absolute",
  top: "18px",
  right: "18px",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  color: "#94a3b8",
};

const iconContainer = {
  width: "58px",
  height: "58px",
  borderRadius: "16px",
  background: "#fef2f2",
  color: "#dc2626",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "18px",
};

const titleStyle = {
  margin: 0,
  fontSize: "18px",
  fontWeight: "700",
  color: "#0f172a",
};

const subtitleStyle = {
  fontSize: "14px",
  color: "#64748b",
  marginTop: "10px",
  lineHeight: "1.5",
};

const footerStyle = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  marginTop: "28px",
};

const btnSecondaryStyle = {
  background: "#fff",
  border: "1px solid #e2e8f0",
  color: "#475569",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "500",
};

const btnDangerStyle = {
  background: "#dc2626",
  border: "none",
  color: "#fff",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};
