import { TriangleAlert, X, Smartphone } from "lucide-react";
import toast from "react-hot-toast";

export default function EliminarCelular({ open, onClose, celular, onDeleted }) {
  if (!open) return null;

  const eliminarCelular = async () => {
    try {
      const res = await fetch(
        `https://localhost:44382/api/CelularesApi/${celular.id}`,
        {
          method: "DELETE",
        },
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
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {/* CLOSE */}
        <button style={closeBtnStyle} onClick={onClose}>
          <X size={16} />
        </button>

        {/* ICON */}
        <div style={iconContainer}>
          <TriangleAlert size={28} />
        </div>

        {/* TITLE */}
        <h3 style={titleStyle}>¿Eliminar este celular?</h3>

        <p style={subtitleStyle}>
          Esta acción eliminará permanentemente el celular{" "}
          <strong>
            {celular?.marca} {celular?.modelo}
          </strong>
          .
        </p>

        {/* INFO */}
        <div style={toolInfoStyle}>
          <div style={toolInfoRow}>
            <Smartphone size={14} />
            <span>{celular?.marca}</span>
          </div>

          <div style={stockBadgeStyle}>IMEI: {celular?.imei}</div>
        </div>

        {/* FOOTER */}
        <div style={footerStyle}>
          <button style={btnSecondaryStyle} onClick={onClose}>
            Cancelar
          </button>

          <button style={btnDangerStyle} onClick={eliminarCelular}>
            Eliminar celular
          </button>
        </div>
      </div>
    </div>
  );
}

/* STYLES */
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
};

const toolInfoStyle = {
  marginTop: "18px",
  padding: "14px",
  borderRadius: "12px",
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
  display: "flex",
  justifyContent: "space-between",
};

const toolInfoRow = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const stockBadgeStyle = {
  background: "#dbeafe",
  color: "#2563eb",
  padding: "4px 10px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: "600",
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
};

const btnDangerStyle = {
  background: "#dc2626",
  border: "none",
  color: "#fff",
  padding: "10px 16px",
  borderRadius: "8px",
};
