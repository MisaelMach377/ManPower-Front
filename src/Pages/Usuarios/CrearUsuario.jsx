import { X, User, Mail, Phone, Hash, BadgeInfo } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CrearUsuario({ open, onClose, onCreated }) {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    tipoDocumento: "DNI",
    numeroDocumento: "",
    correo: "",
    celular: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "celular" && !/^\d*$/.test(value)) return;
    setForm({ ...form, [name]: value });
  };

  //FETCH CREAR USUARIO
  const crearUsuario = async () => {
    if (!isValid) {
      toast.error("Completa bien los campos");
      return;
    }

    try {
      const res = await fetch("https://localhost:44382/api/UsuariosApi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      // 💥 ERROR DEL BACKEND (correo, dni, etc)
      if (!res.ok) {
        toast.error(data?.message || "Error creando usuario");
        return;
      }

      toast.success(data?.message || "Usuario creado correctamente 🔥");

      onClose();
      onCreated();
    } catch (err) {
      console.log(err);
      toast.error("Error de servidor");
    }
  };

  if (!open) return null;

  const isValid =
    form.nombre &&
    form.apellido &&
    form.numeroDocumento &&
    form.correo &&
    form.celular?.length === 9;

  const systemFont =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div
        style={{ ...modalStyle, fontFamily: systemFont }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* BOTÓN X EN LA ESQUINA ABSOLUTA */}
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
          <h3 style={titleStyle}>Crear nuevo usuario</h3>
          <p style={subtitleStyle}>
            Introduce las credenciales e información del perfil.
          </p>
        </div>

        {/* FORM CONTAINER */}
        <div style={formStyle}>
          {/* Fila doble: Nombre y Apellido */}
          <div style={rowStyle}>
            <div style={{ flex: 1 }}>
              <Input
                icon={<User size={14} />}
                name="nombre"
                placeholder="Nombre"
                onChange={handleChange}
                value={form.nombre}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Input
                icon={<User size={14} />}
                name="apellido"
                placeholder="Apellido"
                onChange={handleChange}
                value={form.apellido}
              />
            </div>
          </div>

          {/* Fila doble: Tipo de doc y Número */}
          <div style={rowStyle}>
            <div style={{ width: "32%" }}>
              <div style={inputWrapStyle}>
                <div style={iconStyle}>
                  <BadgeInfo size={14} />
                </div>
                <select
                  name="tipoDocumento"
                  onChange={handleChange}
                  value={form.tipoDocumento}
                  style={selectStyle}
                  required
                >
                  <option value="DNI">DNI</option>
                  <option value="Pasaporte">PAS</option>
                  <option value="CE">C.E</option>
                </select>
              </div>
            </div>
            <div style={{ width: "68%" }}>
              <Input
                icon={<Hash size={14} />}
                name="numeroDocumento"
                placeholder="N° Documento"
                onChange={handleChange}
                value={form.numeroDocumento}
              />
            </div>
          </div>

          {/* Fila única: Correo */}
          <Input
            icon={<Mail size={14} />}
            name="correo"
            type="email"
            placeholder="Correo electrónico"
            onChange={handleChange}
            value={form.correo}
          />

          {/* Fila única: Celular */}
          <Input
            icon={<Phone size={14} />}
            name="celular"
            placeholder="Celular (9 dígitos)"
            maxLength={9}
            onChange={handleChange}
            value={form.celular}
          />
        </div>

        {/* ACTIONS / FOOTER */}
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
            onClick={crearUsuario}
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
            Guardar usuario
          </button>
        </div>
      </div>
    </div>
  );
}

/* COMPONENTE INPUT REUTILIZABLE */
function Input({ icon, ...props }) {
  return (
    <div style={inputWrapStyle}>
      <div style={iconStyle}>{icon}</div>
      <input
        {...props}
        style={inputStyle}
        required
        onFocus={(e) => {
          e.target.style.borderColor = "#2563eb"; // Focus azul para hacer match
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

/* ESTILOS MODIFICADOS */
const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0, 0, 0, 0.15)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backdropFilter: "blur(4px)",
  zIndex: 1000,
};

const modalStyle = {
  position: "relative", // Necesario para posicionar la X de forma absoluta
  width: "100%",
  maxWidth: "520px", // Un poco más ancho y espacioso
  background: "#ffffff",
  borderRadius: "10px",
  border: "1px solid #e5e5e5",
  boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
  overflow: "hidden",
};

const closeBtnStyle = {
  position: "absolute",
  top: "20px",
  right: "20px", // Esquina superior derecha limpia
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
  padding: "28px 24px 20px 24px", // Un poco más de aire arriba
  display: "flex",
  flexDirection: "column",
};

const titleStyle = {
  fontSize: "17px", // Ligeramente más grande
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
  gap: "14px", // Inputs más separados y limpios
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
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px 10px 38px", // Un toque más de padding para inputs más robustos
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
  paddingLeft: "34px",
  cursor: "pointer",
  appearance: "none",
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
  background: "#2563eb", // Azul formal y vibrante (Corporate Premium)
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
