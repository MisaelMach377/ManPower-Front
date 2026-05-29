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

import "./CrearAsignaciones.css";

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
    <div className="asignacion-overlay" onClick={onClose}>
      <div className="asignacion-modal" onClick={(e) => e.stopPropagation()}>
        <button className="asignacion-close" onClick={onClose}>
          <X size={16} />
        </button>

        <div className="asignacion-header">
          <h2 className="asignacion-title">Nueva asignación</h2>
          <p className="asignacion-subtitle">Asigna equipos o herramientas</p>
        </div>

        <div className="asignacion-form">
          {/* USUARIO */}
          <SelectInput
            icon={<User size={14} />}
            name="usuarioId"
            value={form.usuarioId}
            onChange={handleChange}
          >
            <option value="">Selecciona un usuario</option>
            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nombre} {u.apellido}
              </option>
            ))}
          </SelectInput>

          {/* BOTONES DE TIPO */}
          <div className="tipo-row">
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

          {/* SELECT DINÁMICO SEGÚN TIPO */}
          {form.tipoHerramienta === "CELULAR" && (
            <SelectInput
              icon={<Smartphone size={14} />}
              name="celularId"
              value={form.celularId}
              onChange={handleChange}
            >
              <option value="">Selecciona un celular</option>
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
              <option value="">Selecciona una laptop</option>
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
              <option value="">Selecciona una herramienta</option>
              {herramientas.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.descripcion}
                </option>
              ))}
            </SelectInput>
          )}

          {/* INPUTS DE CONTROL */}
          <Input
            icon={<FileText size={14} />}
            name="numeroGuia"
            value={form.numeroGuia}
            onChange={handleChange}
            placeholder="Número de Guía"
          />

          <Input
            icon={<MapPin size={14} />}
            name="zona"
            value={form.zona}
            onChange={handleChange}
            placeholder="Zona / Ubicación"
          />

          <textarea
            name="observaciones"
            value={form.observaciones}
            onChange={handleChange}
            className="asignacion-textarea"
            placeholder="Observaciones adicionales..."
          />
        </div>

        <div className="asignacion-footer">
          <button onClick={onClose} className="btn-cancelar">
            Cancelar
          </button>

          <button
            disabled={!isValid}
            onClick={crearAsignacion}
            className="btn-guardar"
          >
            <ClipboardList size={15} />
            Crear Asignación
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= SUB-COMPONENTES AUXILIARES ================= */

const TypeBtn = ({ active, onClick, icon, label }) => (
  <button
    type="button"
    onClick={onClick}
    className={`tipo-btn ${active ? "active" : ""}`}
  >
    {icon}
    {label}
  </button>
);

function Input({ icon, ...props }) {
  return (
    <div className="input-group">
      {icon && <div className="input-icon">{icon}</div>}
      <input {...props} className="asignacion-input" />
    </div>
  );
}

function SelectInput({ icon, children, ...props }) {
  return (
    <div className="input-group">
      {icon && <div className="input-icon">{icon}</div>}
      <select {...props} className="asignacion-select">
        {children}
      </select>
    </div>
  );
}
