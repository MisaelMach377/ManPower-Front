import { TriangleAlert, X, Laptop } from "lucide-react";
import toast from "react-hot-toast";

export default function EliminarLaptop({ open, onClose, laptop, onDeleted }) {
  if (!open) return null;

  const eliminarLaptop = async () => {
    try {
      const res = await fetch(
        `https://localhost:44382/api/LaptopsApi/${laptop.id}`,
        {
          method: "DELETE",
        },
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
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {/* CLOSE */}
        <button
          style={closeBtnStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#dc2626")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
          onClick={onClose}
        >
          <X size={16} />
        </button>

        {/* ICON */}
        <div style={iconContainer}>
          <TriangleAlert size={28} />
        </div>

        {/* TITLE */}
        <h3 style={titleStyle}>¿Eliminar esta laptop?</h3>

        <p style={subtitleStyle}>
          Esta acción eliminará permanentemente la laptop{" "}
          <strong>
            {laptop?.marca} {laptop?.modelo}
          </strong>
          .
        </p>

        {/* INFO */}
        <div style={toolInfoStyle}>
          <div style={toolInfoRow}>
            <Laptop size={14} />
            <span>{laptop?.serie}</span>
          </div>

          <div style={stockBadgeStyle}>{laptop?.estado}</div>
        </div>

        {/* FOOTER */}
        <div style={footerStyle}>
          <button
            style={btnSecondaryStyle}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f1f5f9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#fff";
            }}
          >
            Cancelar
          </button>

          <button
            style={btnDangerStyle}
            onClick={eliminarLaptop}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.background = "#b91c1c";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.background = "#dc2626";
            }}
          >
            Eliminar laptop
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
  transition: "all 0.2s ease",
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
  alignItems: "center",
};

const toolInfoRow = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  color: "#334155",
  fontSize: "13px",
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
  cursor: "pointer",
  transition: "all 0.2s ease",
};

const btnDangerStyle = {
  background: "#dc2626",
  border: "none",
  color: "#fff",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  transition: "all 0.2s ease",
};
