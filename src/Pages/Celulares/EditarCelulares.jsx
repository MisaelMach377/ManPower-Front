import {
  X,
  Smartphone,
  Hash,
  Phone,
  Building2,
  ShieldCheck,
  Package,
} from "lucide-react";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const initialForm = {
  id: 0,
  marca: "",
  modelo: "",
  imei: "",
  operacion: "Asignación",
  celular: "",
  proveedor: "",
  estado: "Activo",
};

export default function EditarCelular({ open, onClose, celular, onUpdated }) {
  const [form, setForm] = useState(initialForm);

  // 🔥 CARGA DATOS AL ABRIR
  useEffect(() => {
    if (celular) {
      setForm({
        ...celular,
        celular: celular.celular ?? "",
      });
    }
  }, [celular]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleCelular = (e) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value.length <= 9) {
      setForm({ ...form, celular: value });
    }
  };

  const isValid =
    form.marca && form.modelo && form.imei && form.celular.length === 9;

  const editarCelular = async () => {
    if (!isValid) {
      toast.error("Completa bien los campos");
      return;
    }

    try {
      const res = await fetch(
        `https://localhost:44382/api/CelularesApi/${form.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Error actualizando");
        return;
      }

      toast.success("Celular actualizado 🔥");
      onUpdated();
      onClose();
    } catch (err) {
      console.log(err);
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
        <button style={closeBtnStyle} onClick={onClose}>
          <X size={16} />
        </button>

        {/* HEADER */}
        <div style={headerStyle}>
          <h3 style={titleStyle}>Editar celular</h3>
          <p style={subtitleStyle}>Actualiza los datos del celular</p>
        </div>

        {/* FORM */}
        <div style={formStyle}>
          <Input
            icon={<Smartphone size={14} />}
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
            name="imei"
            placeholder="IMEI"
            value={form.imei}
            onChange={handleChange}
          />

          {/* CELULAR (9 DIGITOS) */}
          <Input
            icon={<Phone size={14} />}
            name="celular"
            placeholder="Número celular"
            value={form.celular}
            onChange={handleCelular}
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

        {/* FOOTER */}
        <div style={footerStyle}>
          <button
            onClick={onClose}
            style={btnSecondaryStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#f5f5f5";
              e.currentTarget.style.color = "#111";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#999";
            }}
          >
            Cancelar
          </button>

          <button
            onClick={editarCelular}
            disabled={!isValid}
            style={{
              ...btnPrimaryStyle,
              opacity: isValid ? 1 : 0.4,
              cursor: isValid ? "pointer" : "not-allowed",
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

/* STYLES (igual que herramientas) */
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

const closeBtnStyle = {
  position: "absolute",
  top: "14px",
  right: "14px",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  padding: "6px",
  borderRadius: "6px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#999",
  transition: "all 0.15s ease",
};

const btnSecondaryStyle = {
  background: "transparent",
  border: "1px solid #ddd",
  padding: "9px 14px",
  borderRadius: "8px",
};
