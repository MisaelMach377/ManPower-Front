import { X, User, Mail, Phone, Hash, BadgeInfo } from "lucide-react";

import { useState } from "react";
import toast from "react-hot-toast";

import "./CrearUsuario.css";

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

    setForm({
      ...form,
      [name]: value,
    });
  };

  const isValid =
    form.nombre &&
    form.apellido &&
    form.numeroDocumento &&
    form.correo &&
    form.celular?.length === 9;

  const crearUsuario = async () => {
    if (!isValid) {
      toast.error("Completa bien los campos");
      return;
    }

    try {
      const res = await fetch("https://localhost:44382/api/UsuariosApi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

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

  return (
    <div className="crear-usuario-overlay" onClick={onClose}>
      <div className="crear-usuario-modal" onClick={(e) => e.stopPropagation()}>
        <button className="crear-usuario-close" onClick={onClose}>
          <X size={16} strokeWidth={2.5} />
        </button>

        <div className="crear-usuario-header">
          <h3 className="crear-usuario-title">Crear nuevo usuario</h3>

          <p className="crear-usuario-subtitle">
            Introduce las credenciales e información del perfil.
          </p>
        </div>

        <div className="crear-usuario-form">
          <div className="crear-usuario-row">
            <Input
              icon={<User size={14} />}
              name="nombre"
              placeholder="Nombre"
              onChange={handleChange}
              value={form.nombre}
            />

            <Input
              icon={<User size={14} />}
              name="apellido"
              placeholder="Apellido"
              onChange={handleChange}
              value={form.apellido}
            />
          </div>

          <div className="crear-usuario-row">
            <div style={{ width: "32%" }}>
              <div className="input-wrap">
                <div className="input-icon">
                  <BadgeInfo size={14} />
                </div>

                <select
                  name="tipoDocumento"
                  onChange={handleChange}
                  value={form.tipoDocumento}
                  className="select-custom"
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

          <Input
            icon={<Mail size={14} />}
            name="correo"
            type="email"
            placeholder="Correo electrónico"
            onChange={handleChange}
            value={form.correo}
          />

          <Input
            icon={<Phone size={14} />}
            name="celular"
            placeholder="Celular (9 dígitos)"
            maxLength={9}
            onChange={handleChange}
            value={form.celular}
          />
        </div>

        <div className="crear-usuario-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancelar
          </button>

          <button
            className="btn-primary"
            onClick={crearUsuario}
            disabled={!isValid}
          >
            Guardar usuario
          </button>
        </div>
      </div>
    </div>
  );
}

/* INPUT REUTILIZABLE */
function Input({ icon, ...props }) {
  return (
    <div className="input-wrap">
      <div className="input-icon">{icon}</div>

      <input {...props} className="input-custom" required />
    </div>
  );
}
