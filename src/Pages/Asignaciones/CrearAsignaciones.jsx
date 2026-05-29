import {
  X,
  User,
  Smartphone,
  Laptop,
  FileText,
  MapPin,
  ClipboardList,
  Wrench,
} from "lucide-react";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CrearAsignacion({
  open,
  onClose,
  obtenerAsignaciones,
}) {
  const [usuarios, setUsuarios] = useState([]);
  const [celulares, setCelulares] = useState([]);
  const [laptops, setLaptops] = useState([]);
  const [herramientas, setHerramientas] = useState([]);

  const [form, setForm] = useState({
    usuarioId: "",
    tipoHerramienta: "CELULAR",

    celularId: "",
    laptopId: "",
    herramientaId: "",

    numeroGuia: "",
    zona: "",
    estado: "ACTIVO",
    observaciones: "",
  });

  useEffect(() => {
    if (open) {
      obtenerUsuarios();
      obtenerCelulares();
      obtenerLaptops();
      obtenerHerramientas();
    }
  }, [open]);

  const obtenerUsuarios = async () => {
    const res = await fetch("https://localhost:44382/api/UsuariosApi");
    setUsuarios(await res.json());
  };

  const obtenerCelulares = async () => {
    const res = await fetch("https://localhost:44382/api/CelularesApi");
    setCelulares(await res.json());
  };

  const obtenerLaptops = async () => {
    const res = await fetch("https://localhost:44382/api/LaptopsApi");
    setLaptops(await res.json());
  };

  const obtenerHerramientas = async () => {
    const res = await fetch("https://localhost:44382/api/HerramientasApi");
    setHerramientas(await res.json());
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const crearAsignacion = async () => {
    try {
      const payload = {
        usuarioId: Number(form.usuarioId),
        tipoHerramienta: form.tipoHerramienta,

        celularId:
          form.tipoHerramienta === "CELULAR" ? Number(form.celularId) : null,

        laptopId:
          form.tipoHerramienta === "LAPTOP" ? Number(form.laptopId) : null,

        herramientaId:
          form.tipoHerramienta === "HERRAMIENTA"
            ? Number(form.herramientaId)
            : null,

        numeroGuia: form.numeroGuia,
        zona: form.zona,
        estado: form.estado,
        observaciones: form.observaciones,
      };

      const res = await fetch("https://localhost:44382/api/AsignacionesApi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Error");
        return;
      }

      toast.success("Asignación creada 🔥");

      onClose();
      obtenerAsignaciones();

      setForm({
        usuarioId: "",
        tipoHerramienta: "CELULAR",
        celularId: "",
        laptopId: "",
        herramientaId: "",
        numeroGuia: "",
        zona: "",
        estado: "ACTIVO",
        observaciones: "",
      });
    } catch (err) {
      toast.error("Error servidor");
    }
  };

  if (!open) return null;

  const isValid =
    form.usuarioId &&
    ((form.tipoHerramienta === "CELULAR" && form.celularId) ||
      (form.tipoHerramienta === "LAPTOP" && form.laptopId) ||
      (form.tipoHerramienta === "HERRAMIENTA" && form.herramientaId));

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <button style={closeBtnStyle} onClick={onClose}>
          <X size={16} />
        </button>

        <div style={headerStyle}>
          <h2 style={titleStyle}>Nueva asignación</h2>
          <p style={subtitleStyle}>Asigna equipos o herramientas</p>
        </div>

        <div style={formStyle}>
          {/* USUARIO */}
          <SelectInput
            icon={<User size={14} />}
            name="usuarioId"
            value={form.usuarioId}
            onChange={handleChange}
          >
            <option value="">Usuario</option>
            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nombre} {u.apellido}
              </option>
            ))}
          </SelectInput>

          {/* BOTONES */}
          <div style={rowStyle}>
            <TypeBtn
              active={form.tipoHerramienta === "CELULAR"}
              onClick={() =>
                setForm({
                  ...form,
                  tipoHerramienta: "CELULAR",
                  laptopId: "",
                  herramientaId: "",
                })
              }
              icon={<Smartphone size={15} />}
              label="Celular"
            />

            <TypeBtn
              active={form.tipoHerramienta === "LAPTOP"}
              onClick={() =>
                setForm({
                  ...form,
                  tipoHerramienta: "LAPTOP",
                  celularId: "",
                  herramientaId: "",
                })
              }
              icon={<Laptop size={15} />}
              label="Laptop"
            />

            <TypeBtn
              active={form.tipoHerramienta === "HERRAMIENTA"}
              onClick={() =>
                setForm({
                  ...form,
                  tipoHerramienta: "HERRAMIENTA",
                  celularId: "",
                  laptopId: "",
                })
              }
              icon={<Wrench size={15} />}
              label="Herramienta"
            />
          </div>

          {/* SELECTS */}
          {form.tipoHerramienta === "CELULAR" && (
            <SelectInput
              icon={<Smartphone size={14} />}
              name="celularId"
              value={form.celularId}
              onChange={handleChange}
            >
              <option value="">Celular</option>
              {celulares.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.marca} {c.modelo}
                </option>
              ))}
            </SelectInput>
          )}

          {form.tipoHerramienta === "LAPTOP" && (
            <SelectInput
              icon={<Laptop size={14} />}
              name="laptopId"
              value={form.laptopId}
              onChange={handleChange}
            >
              <option value="">Laptop</option>
              {laptops.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.marca} {l.modelo}
                </option>
              ))}
            </SelectInput>
          )}

          {form.tipoHerramienta === "HERRAMIENTA" && (
            <SelectInput
              icon={<Wrench size={14} />}
              name="herramientaId"
              value={form.herramientaId}
              onChange={handleChange}
            >
              <option value="">Herramienta</option>
              {herramientas.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.descripcion}
                </option>
              ))}
            </SelectInput>
          )}

          {/* INPUTS */}
          <Input
            icon={<FileText size={14} />}
            name="numeroGuia"
            value={form.numeroGuia}
            onChange={handleChange}
            placeholder="Guía"
          />

          <Input
            icon={<MapPin size={14} />}
            name="zona"
            value={form.zona}
            onChange={handleChange}
            placeholder="Zona"
          />

          <textarea
            name="observaciones"
            value={form.observaciones}
            onChange={handleChange}
            style={textareaStyle}
            placeholder="Observaciones"
          />
        </div>

        <div style={footerStyle}>
          <button onClick={onClose} style={btnSecondaryStyle}>
            Cancelar
          </button>

          <button
            disabled={!isValid}
            onClick={crearAsignacion}
            style={{
              ...btnPrimaryStyle,
              opacity: isValid ? 1 : 0.5,
            }}
          >
            <ClipboardList size={15} />
            Crear
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.2)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};

const modalStyle = {
  width: "100%",
  maxWidth: "620px",
  background: "#fff",
  borderRadius: "16px",
  overflow: "hidden",
};

const closeBtnStyle = {
  position: "absolute",
  right: 15,
  top: 15,
  background: "transparent",
  border: "none",
  cursor: "pointer",
};

const headerStyle = { padding: 20 };
const titleStyle = { fontSize: 20, fontWeight: "bold" };
const subtitleStyle = { fontSize: 13, color: "#666" };
const formStyle = {
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 12,
};
const rowStyle = { display: "flex", gap: 10 };

const TypeBtn = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    style={{
      flex: 1,
      padding: 10,
      borderRadius: 10,
      border: "1px solid #ddd",
      background: active ? "#2563eb" : "#fff",
      color: active ? "#fff" : "#000",
      display: "flex",
      gap: 6,
      justifyContent: "center",
    }}
  >
    {icon}
    {label}
  </button>
);

function Input(props) {
  return (
    <input
      {...props}
      style={{ padding: 10, border: "1px solid #ddd", borderRadius: 8 }}
    />
  );
}

function SelectInput({ icon, children, ...props }) {
  return (
    <div>
      {icon}
      <select {...props} style={{ width: "100%", padding: 10 }}>
        {children}
      </select>
    </div>
  );
}

const textareaStyle = {
  padding: 10,
  borderRadius: 8,
  border: "1px solid #ddd",
};

const footerStyle = {
  padding: 20,
  display: "flex",
  justifyContent: "flex-end",
  gap: 10,
};

const btnPrimaryStyle = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: 10,
  borderRadius: 8,
};

const btnSecondaryStyle = {
  background: "#fff",
  border: "1px solid #ddd",
  padding: 10,
  borderRadius: 8,
};
