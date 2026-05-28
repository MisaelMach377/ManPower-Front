import {
  X,
  Smartphone,
  Hash,
  Phone,
  Building2,
  ShieldCheck,
  Package,
} from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const initialForm = {
  marca: "",
  modelo: "",
  imei: "",
  operacion: "Asignación",
  celular: "",
  proveedor: "",
  estado: "Activo",
};

export default function CrearCelular({ open, onClose, onCreated }) {
  const [form, setForm] = useState(initialForm);

  // 🔥 RESET AUTOMÁTICO CUANDO SE ABRE
  useEffect(() => {
    if (open) {
      setForm(initialForm);
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const isValid =
    form.marca && form.modelo && form.imei && form.celular.length === 9;

  const crearCelular = async () => {
    if (!isValid) {
      toast.error("Completa los campos");
      return;
    }

    try {
      const res = await fetch("https://localhost:44382/api/CelularesApi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Error creando celular");
        return;
      }

      toast.success("Celular creado 🔥");
      onClose();
      onCreated();
    } catch (err) {
      console.log(err);
      toast.error("Error de servidor");
    }
  };

  if (!open) return null;

  const systemFont =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial';

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div
        style={{ ...modalStyle, fontFamily: systemFont }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button style={closeBtnStyle} onClick={onClose}>
          <X size={16} />
        </button>

        {/* HEADER */}
        <div style={headerStyle}>
          <h3 style={titleStyle}>Nuevo celular</h3>
          <p style={subtitleStyle}>Registra un celular en inventario</p>
        </div>

        {/* FORM */}
        <div style={innerStyle}>
          <div style={formStyle}>
            {/* MARCA */}
            <Input
              icon={<Smartphone size={14} />}
              name="marca"
              placeholder="Marca"
              value={form.marca}
              onChange={handleChange}
            />

            {/* MODELO */}
            <Input
              icon={<Package size={14} />}
              name="modelo"
              placeholder="Modelo"
              value={form.modelo}
              onChange={handleChange}
            />

            {/* IMEI */}
            <Input
              icon={<Hash size={14} />}
              name="imei"
              placeholder="IMEI"
              value={form.imei}
              onChange={handleChange}
            />

            {/* CELULAR (MAX 9 DIGITOS) */}
            <Input
              icon={<Phone size={14} />}
              name="celular"
              placeholder="Número celular"
              value={form.celular}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 9) {
                  setForm({ ...form, celular: value });
                }
              }}
              maxLength={9}
            />

            {/* OPERACION */}
            <div style={inputWrapStyle}>
              <div style={iconStyle}>
                <ShieldCheck size={14} />
              </div>

              <select
                name="operacion"
                value={form.operacion}
                onChange={handleChange}
                style={selectStyle}
              >
                <option value="Asignación">Asignación</option>
                <option value="Devolución">Devolución</option>
                <option value="Cambio">Cambio</option>
                <option value="Baja">Baja</option>
              </select>
            </div>

            {/* PROVEEDOR */}
            <Input
              icon={<Building2 size={14} />}
              name="proveedor"
              placeholder="Proveedor"
              value={form.proveedor}
              onChange={handleChange}
            />

            {/* ESTADO */}
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
        </div>

        {/* FOOTER */}
        {/* FOOTER */}
        <div style={footerStyle}>
          <button
            onClick={onClose}
            style={btnSecondaryStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f3f4f6";
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Cancelar
          </button>

          <button
            onClick={crearCelular}
            disabled={!isValid}
            style={{
              ...btnPrimaryStyle,
              opacity: isValid ? 1 : 0.4,
              cursor: isValid ? "pointer" : "not-allowed",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (!isValid) return;
              e.currentTarget.style.background = "#1d4ed8";
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#2563eb";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Guardar celular
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
