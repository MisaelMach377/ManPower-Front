import {
  X,
  User,
  Mail,
  Phone,
  Hash,
  BadgeInfo,
  ShieldCheck,
} from "lucide-react";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./EditarUsuario.css";

export default function EditarUsuario({ open, onClose, usuario, onUpdated }) {
  const [form, setForm] = useState({
    id: 0,
    nombre: "",
    apellido: "",
    tipoDocumento: "DNI",
    numeroDocumento: "",
    correo: "",
    celular: "",
    activo: true,
  });

  useEffect(() => {
    if (usuario) {
      setForm(usuario);
    }
  }, [usuario]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "celular" && !/^\d*$/.test(value)) return;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const editarUsuario = async () => {
    if (!isValid) {
      toast.error("Completa bien los campos");
      return;
    }

    try {
      const res = await fetch(
        `https://localhost:44382/api/UsuariosApi/${form.id}`,
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

      toast.success(data?.message || "Usuario actualizado");

      onUpdated();
      onClose();
    } catch (err) {
      console.log(err);
      toast.error("Error del servidor");
    }
  };

  const isValid =
    form.nombre &&
    form.apellido &&
    form.numeroDocumento &&
    form.correo &&
    form.celular?.length === 9;

  const systemFont =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

  return (
    <div className="editar-usuario-overlay" onClick={onClose}>
      <div
        className="editar-usuario-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="editar-usuario-close" onClick={onClose}>
          <X size={16} strokeWidth={2.5} />
        </button>

        <div className="editar-usuario-header">
          <h3 className="editar-usuario-title">Editar usuario</h3>

          <p className="editar-usuario-subtitle">
            Actualiza la información y estado del usuario.
          </p>
        </div>

        <div className="editar-usuario-form">
          <div className="editar-usuario-row">
            <div className="editar-usuario-flex">
              <Input
                icon={<User size={14} />}
                name="nombre"
                placeholder="Nombre"
                value={form.nombre}
                onChange={handleChange}
              />
            </div>

            <div className="editar-usuario-flex">
              <Input
                icon={<User size={14} />}
                name="apellido"
                placeholder="Apellido"
                value={form.apellido}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="editar-usuario-row">
            <div className="editar-usuario-doc-small">
              <div className="editar-usuario-input-wrap">
                <div className="editar-usuario-icon">
                  <BadgeInfo size={14} />
                </div>

                <select
                  name="tipoDocumento"
                  value={form.tipoDocumento}
                  onChange={handleChange}
                  className="editar-usuario-select"
                >
                  <option value="DNI">DNI</option>
                  <option value="Pasaporte">PAS</option>
                  <option value="CE">C.E</option>
                </select>
              </div>
            </div>

            <div className="editar-usuario-doc-large">
              <Input
                icon={<Hash size={14} />}
                name="numeroDocumento"
                placeholder="N° Documento"
                value={form.numeroDocumento}
                onChange={handleChange}
              />
            </div>
          </div>

          <Input
            icon={<Mail size={14} />}
            name="correo"
            placeholder="Correo electrónico"
            value={form.correo}
            onChange={handleChange}
          />

          <Input
            icon={<Phone size={14} />}
            name="celular"
            placeholder="Celular (9 dígitos)"
            maxLength={9}
            value={form.celular}
            onChange={handleChange}
          />

          <div
            className={`estado-card ${form.activo ? "activo" : "inactivo"}`}
            onClick={() =>
              setForm({
                ...form,
                activo: !form.activo,
              })
            }
          >
            <div className="estado-left">
              <div
                className={`estado-icon ${form.activo ? "activo" : "inactivo"}`}
              >
                <ShieldCheck size={16} />
              </div>

              <div>
                <div className="estado-title">Estado del usuario</div>

                <div className="estado-subtitle">
                  {form.activo
                    ? "Usuario habilitado en el sistema"
                    : "Usuario desactivado"}
                </div>
              </div>
            </div>

            <div
              className={`estado-switch ${form.activo ? "activo" : "inactivo"}`}
            >
              <div
                className={`estado-switch-ball ${
                  form.activo ? "activo" : "inactivo"
                }`}
              />
            </div>
          </div>
        </div>

        <div className="editar-usuario-footer">
          <button onClick={onClose} className="btn-cancelar">
            Cancelar
          </button>

          <button
            onClick={editarUsuario}
            disabled={!isValid}
            className="btn-guardar"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}

/* INPUT REUTILIZABLE */
function Input({ icon, ...props }) {
  return (
    <div className="editar-usuario-input-wrap">
      <div className="editar-usuario-icon">{icon}</div>

      <input {...props} className="editar-usuario-input" />
    </div>
  );
}
