import { X, Laptop, Hash, Building2, ShieldCheck, Package } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const initialForm = {
  id: 0,
  marca: "",
  modelo: "",
  serie: "",
  proveedor: "",
  observaciones: "",
  estado: "Activo",
};

export default function EditarLaptop({ open, onClose, laptop, onUpdated }) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (laptop) setForm(laptop);
  }, [laptop]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const isValid = form.marca && form.modelo && form.serie;

  const editarLaptop = async () => {
    if (!isValid) {
      toast.error("Completa los campos");
      return;
    }

    try {
      const res = await fetch(
        `https://localhost:44382/api/LaptopsApi/${form.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Error actualizando");
        return;
      }

      toast.success("Laptop actualizada 🔥");
      onUpdated();
      onClose();
    } catch {
      toast.error("Error del servidor");
    }
  };

  const systemFont =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial';

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div
        style={{ ...modalStyle, fontFamily: systemFont }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button
          style={closeBtnStyle}
          onClick={onClose}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f3f4f6";
            e.currentTarget.style.color = "#111";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#999";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <X size={16} />
        </button>

        {/* HEADER */}
        <div style={headerStyle}>
          <h3 style={titleStyle}>Editar laptop</h3>
          <p style={subtitleStyle}>Actualiza los datos del equipo</p>
        </div>

        {/* FORM */}
        <div style={formStyle}>
          <Input
            icon={<Laptop size={14} />}
            name="marca"
            placeholder="Marca"
            value={form.marca}
            onChange={handleChange}
          />
          <Input
            icon={<Package size={14} />}
            name="modelo"
            placeholder="Modelo"
            value={form.modelo}
            onChange={handleChange}
          />
          <Input
            icon={<Hash size={14} />}
            name="serie"
            placeholder="Serie"
            value={form.serie}
            onChange={handleChange}
          />
          <Input
            icon={<Building2 size={14} />}
            name="proveedor"
            placeholder="Proveedor"
            value={form.proveedor}
            onChange={handleChange}
          />

          <textarea
            name="observaciones"
            placeholder="Observaciones"
            value={form.observaciones}
            onChange={handleChange}
            style={textareaStyle}
          />

          <div style={inputWrapStyle}>
            <div style={iconStyle}>
              <ShieldCheck size={14} />
            </div>

            <select
              name="estado"
              value={form.estado}
              onChange={handleChange}
              style={selectStyle}
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
              <option value="Reparación">Reparación</option>
              <option value="Perdido">Perdido</option>
            </select>
          </div>
        </div>

        {/* FOOTER */}
        <div style={footerStyle}>
          <button
            onClick={onClose}
            style={btnSecondaryStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f3f4f6";
              e.currentTarget.style.borderColor = "#d1d5db";
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "#ddd";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Cancelar
          </button>

          <button
            onClick={editarLaptop}
            disabled={!isValid}
            style={{
              ...btnPrimaryStyle,
              opacity: isValid ? 1 : 0.4,
              cursor: isValid ? "pointer" : "not-allowed",
            }}
            onMouseEnter={(e) => {
              if (!isValid) return;
              e.currentTarget.style.background = "#1d4ed8";
              e.currentTarget.style.transform = "scale(1.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#2563eb";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}

/* INPUT */
function Input({ icon, ...props }) {
  return (
    <div style={inputWrapStyle}>
      <div style={iconStyle}>{icon}</div>
      <input
        {...props}
        style={inputStyle}
        onFocus={(e) => {
          e.target.style.borderColor = "#2563eb";
          e.target.style.boxShadow = "0 0 0 1px #2563eb";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#e5e5e5";
          e.target.style.boxShadow = "none";
        }}
      />
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
  maxWidth: "520px",
  background: "#fff",
  borderRadius: "12px",
  border: "1px solid #e5e5e5",
  boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
  position: "relative",
};

const headerStyle = {
  padding: "24px 24px 10px",
};

const titleStyle = {
  margin: 0,
  fontSize: "17px",
  fontWeight: "600",
};

const subtitleStyle = {
  margin: "4px 0 0",
  fontSize: "13px",
  color: "#666",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  padding: "0 24px 24px",
};

const inputWrapStyle = {
  position: "relative",
};

const iconStyle = {
  position: "absolute",
  left: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#999",
};

const inputStyle = {
  width: "100%",
  padding: "10px 10px 10px 36px",
  border: "1px solid #e5e5e5",
  borderRadius: "8px",
  fontSize: "13px",
  outline: "none",
  boxSizing: "border-box",
};

const textareaStyle = {
  ...inputStyle,
  minHeight: "90px",
  resize: "none",
};

const selectStyle = {
  ...inputStyle,
  cursor: "pointer",
};

const footerStyle = {
  padding: "14px 24px 18px",
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  borderTop: "1px solid #eee",
};

const btnPrimaryStyle = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "9px 14px",
  borderRadius: "8px",
  transition: "all 0.15s ease",
};

const btnSecondaryStyle = {
  background: "transparent",
  border: "1px solid #ddd",
  padding: "9px 14px",
  borderRadius: "8px",
  transition: "all 0.15s ease",
};

const closeBtnStyle = {
  position: "absolute",
  top: "14px",
  right: "14px",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  padding: "6px",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#999",
  transition: "all 0.15s ease",
};
