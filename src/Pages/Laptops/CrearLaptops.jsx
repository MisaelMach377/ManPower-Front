import { X, Laptop, Hash, Building2, ShieldCheck, Package } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const initialForm = {
  marca: "",
  modelo: "",
  serie: "",
  proveedor: "",
  observaciones: "",
  estado: "Activo",
};

export default function CrearLaptop({ open, onClose, onCreated }) {
  const [form, setForm] = useState(initialForm);
  const [hoverClose, setHoverClose] = useState(false);
  const [hoverSave, setHoverSave] = useState(false);
  const [hoverCancel, setHoverCancel] = useState(false);

  // RESET AUTOMÁTICO
  useEffect(() => {
    if (open) {
      setForm({
        ...initialForm,
        estado: "Activo",
      });
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isValid = form.marca && form.modelo && form.serie && form.proveedor;

  const crearLaptop = async () => {
    if (!isValid) return toast.error("Completa los campos");

    try {
      const res = await fetch("https://localhost:44382/api/LaptopsApi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) return toast.error(data?.message || "Error creando laptop");

      toast.success("Laptop creada 🔥");
      onClose();
      onCreated();
    } catch (err) {
      console.log(err);
      toast.error("Error de servidor");
    }
  };

  if (!open) return null;

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {/* CLOSE */}
        <button
          style={{
            ...closeBtnStyle,
            color: hoverClose ? "#dc2626" : "#94a3b8",
            transform: hoverClose ? "scale(1.1)" : "scale(1)",
            transition: "all 0.15s ease",
          }}
          onMouseEnter={() => setHoverClose(true)}
          onMouseLeave={() => setHoverClose(false)}
          onClick={onClose}
        >
          <X size={16} />
        </button>

        {/* HEADER */}
        <div style={headerStyle}>
          <h3 style={titleStyle}>Nueva laptop</h3>
          <p style={subtitleStyle}>Registra una laptop en inventario</p>
        </div>

        {/* FORM */}
        <div style={innerStyle}>
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

            {/* OBSERVACIONES */}
            <textarea
              name="observaciones"
              placeholder="Observaciones"
              value={form.observaciones}
              onChange={handleChange}
              style={textareaStyle}
            />
          </div>
        </div>

        {/* FOOTER */}
        <div style={footerStyle}>
          <button
            onClick={onClose}
            onMouseEnter={() => setHoverCancel(true)}
            onMouseLeave={() => setHoverCancel(false)}
            style={{
              ...btnSecondaryStyle,
              background: hoverCancel ? "#f3f4f6" : "transparent",
              transform: hoverCancel ? "scale(1.05)" : "scale(1)",
              transition: "all 0.15s ease",
            }}
          >
            Cancelar
          </button>

          <button
            onClick={crearLaptop}
            disabled={!isValid}
            style={{
              ...btnPrimaryStyle,
              opacity: isValid ? 1 : 0.4,
              cursor: isValid ? "pointer" : "not-allowed",
            }}
          >
            Guardar laptop
          </button>
        </div>
      </div>
    </div>
  );
}

/* INPUT COMPONENT */
function Input({ icon, ...props }) {
  return (
    <div style={inputWrapStyle}>
      <div style={iconStyle}>{icon}</div>
      <input {...props} style={inputStyle} />
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
  maxWidth: "480px",
  background: "#fff",
  borderRadius: "12px",
  border: "1px solid #e5e5e5",
  boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
  position: "relative",
};

const innerStyle = {
  padding: "0 24px 24px 24px",
};

const closeBtnStyle = {
  position: "absolute",
  top: "14px",
  right: "14px",
  border: "none",
  background: "transparent",
  cursor: "pointer",
};

const headerStyle = {
  padding: "24px 24px 10px 24px",
};

const titleStyle = {
  margin: 0,
  fontSize: "17px",
  fontWeight: "600",
};

const subtitleStyle = {
  margin: "4px 0 0 0",
  fontSize: "13px",
  color: "#666",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
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
  height: "80px",
  resize: "none",
  paddingLeft: "10px",
};

const selectStyle = {
  ...inputStyle,
  cursor: "pointer",
};

const footerStyle = {
  padding: "14px 24px 18px 24px",
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
};

const btnSecondaryStyle = {
  background: "transparent",
  border: "1px solid #ddd",
  padding: "9px 14px",
  borderRadius: "8px",
};
