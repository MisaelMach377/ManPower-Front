import { X, Wrench, Package, Layers3, Boxes, DollarSign } from "lucide-react";

import { useState } from "react";
import toast from "react-hot-toast";

export default function CrearHerramienta({ open, onClose, onCreated }) {
  const [form, setForm] = useState({
    descripcion: "",
    unidadMedida: "Unidad",
    familia: "",
    stock: "",
    precio: "",
    categoria: "Manual",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // INPUTS NUMÉRICOS
    if (name === "stock" || name === "precio") {
      setForm({
        ...form,
        [name]: value === "" ? "" : value,
      });

      return;
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  // CREAR
  const crearHerramienta = async () => {
    if (!isValid) {
      toast.error("Completa los campos");
      return;
    }

    try {
      const res = await fetch("https://localhost:44382/api/HerramientasApi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...form,
          stock: Number(form.stock),
          precio: Number(form.precio),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Error creando herramienta");
        return;
      }

      toast.success(data?.message || "Herramienta creada correctamente 🔥");

      onClose();
      onCreated();
    } catch (err) {
      console.log(err);
      toast.error("Error de servidor");
    }
  };

  if (!open) return null;

  const isValid = form.descripcion && form.stock !== "" && form.precio !== "";

  const systemFont =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div
        style={{
          ...modalStyle,
          fontFamily: systemFont,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* CERRAR */}
        <button
          style={closeBtnStyle}
          onClick={onClose}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#f5f5f5";
            e.currentTarget.style.color = "#111111";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#999999";
          }}
        >
          <X size={16} strokeWidth={2.5} />
        </button>

        {/* HEADER */}
        <div style={headerStyle}>
          <h3 style={titleStyle}>Nueva herramienta</h3>

          <p style={subtitleStyle}>
            Registra una nueva herramienta en inventario.
          </p>
        </div>

        {/* FORM */}
        <div style={formStyle}>
          {/* DESCRIPCION */}
          <Input
            icon={<Wrench size={14} />}
            name="descripcion"
            placeholder="Descripción"
            onChange={handleChange}
            value={form.descripcion}
          />

          {/* UNIDAD + FAMILIA */}
          <div style={rowStyle}>
            {/* UNIDAD */}
            <div style={{ flex: 1 }}>
              <div style={inputWrapStyle}>
                <div style={iconStyle}>
                  <Package size={14} />
                </div>

                <select
                  name="unidadMedida"
                  value={form.unidadMedida}
                  onChange={handleChange}
                  style={selectStyle}
                >
                  <option value="Unidad">Unidad</option>

                  <option value="Centímetros">Centímetros</option>

                  <option value="Metros">Metros</option>

                  <option value="Kilogramos">Kilogramos</option>

                  <option value="Litros">Litros</option>

                  <option value="Caja">Caja</option>

                  <option value="Paquete">Paquete</option>

                  <option value="Juego">Juego</option>
                </select>
              </div>
            </div>

            {/* FAMILIA */}
            <div style={{ flex: 1 }}>
              <Input
                icon={<Layers3 size={14} />}
                name="familia"
                placeholder="Familia"
                onChange={handleChange}
                value={form.familia}
              />
            </div>
          </div>

          {/* STOCK + PRECIO */}
          <div style={rowStyle}>
            <div style={{ flex: 1 }}>
              <Input
                icon={<Boxes size={14} />}
                type="number"
                name="stock"
                placeholder="Stock"
                onChange={handleChange}
                value={form.stock}
              />
            </div>

            <div style={{ flex: 1 }}>
              <Input
                icon={<DollarSign size={14} />}
                type="number"
                step="0.01"
                name="precio"
                placeholder="Precio"
                onChange={handleChange}
                value={form.precio}
              />
            </div>
          </div>

          {/* CATEGORIA */}
          <div style={inputWrapStyle}>
            <div style={iconStyle}>
              <Package size={14} />
            </div>

            <select
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
              style={selectStyle}
            >
              <option value="Manual">Manual</option>

              <option value="Eléctrico">Eléctrico</option>

              <option value="Industrial">Industrial</option>

              <option value="Construcción">Construcción</option>

              <option value="Mantenimiento">Mantenimiento</option>

              <option value="Seguridad">Seguridad</option>

              <option value="Soldadura">Soldadura</option>

              <option value="Medición">Medición</option>
            </select>
          </div>
        </div>

        {/* FOOTER */}
        <div style={footerStyle}>
          <button
            onClick={onClose}
            style={btnSecondaryStyle}
            onMouseOver={(e) => (e.target.style.background = "#f5f5f5")}
            onMouseOut={(e) => (e.target.style.background = "transparent")}
          >
            Cancelar
          </button>

          <button
            onClick={crearHerramienta}
            disabled={!isValid}
            style={{
              ...btnPrimaryStyle,
              opacity: isValid ? 1 : 0.4,
              cursor: isValid ? "pointer" : "not-allowed",
            }}
            onMouseOver={(e) => {
              if (isValid) e.target.style.background = "#1d4ed8";
            }}
            onMouseOut={(e) => {
              if (isValid) e.target.style.background = "#2563eb";
            }}
          >
            Guardar herramienta
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
        required
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
  position: "relative",
  width: "100%",
  maxWidth: "520px",
  background: "#ffffff",
  borderRadius: "10px",
  border: "1px solid #e5e5e5",
  boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
  overflow: "hidden",
};

const closeBtnStyle = {
  position: "absolute",
  top: "20px",
  right: "20px",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  padding: "6px",
  borderRadius: "6px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#999999",
  transition: "all 0.15s ease",
  zIndex: 10,
};

const headerStyle = {
  padding: "28px 24px 20px 24px",
  display: "flex",
  flexDirection: "column",
};

const titleStyle = {
  fontSize: "17px",
  fontWeight: "600",
  color: "#111111",
  margin: 0,
  letterSpacing: "-0.01em",
};

const subtitleStyle = {
  fontSize: "13px",
  color: "#666666",
  margin: "4px 0 0 0",
};

const formStyle = {
  padding: "0 24px 28px 24px",
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const rowStyle = {
  display: "flex",
  gap: "14px",
};

const inputWrapStyle = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  width: "100%",
};

const iconStyle = {
  position: "absolute",
  left: "12px",
  color: "#999999",
  display: "flex",
  alignItems: "center",
  pointerEvents: "none",
  zIndex: 1,
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px 10px 38px",
  borderRadius: "6px",
  border: "1px solid #e5e5e5",
  fontSize: "13.5px",
  color: "#222222",
  background: "#ffffff",
  outline: "none",
  transition: "all 0.15s ease",
};

const selectStyle = {
  ...inputStyle,
  appearance: "none",
  cursor: "pointer",
};

const footerStyle = {
  padding: "16px 24px 24px 24px",
  borderTop: "1px solid #f0f0f0",
  display: "flex",
  justifyContent: "flex-end",
  gap: "8px",
  background: "#fcfcfc",
};

const btnPrimaryStyle = {
  background: "#2563eb",
  border: "none",
  color: "#ffffff",
  padding: "9px 18px",
  borderRadius: "6px",
  fontSize: "13px",
  fontWeight: "500",
  transition: "background 0.15s ease",
};

const btnSecondaryStyle = {
  background: "transparent",
  border: "1px solid #e5e5e5",
  color: "#666666",
  padding: "9px 18px",
  borderRadius: "6px",
  fontSize: "13px",
  fontWeight: "500",
  cursor: "pointer",
  transition: "all 0.15s ease",
};
