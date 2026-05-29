import React, { useEffect, useState } from "react";
import {
  X,
  User,
  Mail,
  Phone,
  Hash,
  CreditCard,
  ShieldCheck,
  Loader2,
} from "lucide-react";
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open && usuario) {
      setForm(usuario);
    }
  }, [open, usuario]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "celular" && !/^\d*$/.test(value)) return;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const toggleActivo = () => {
    setForm((prev) => ({ ...prev, activo: !prev.activo }));
  };

  const isValid =
    form.nombre?.trim() &&
    form.apellido?.trim() &&
    form.numeroDocumento?.trim() &&
    form.correo?.trim() &&
    form.celular?.length === 9;

  const editarUsuario = async () => {
    if (!isValid || isSubmitting) return;

    try {
      setIsSubmitting(true);
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

      // Validamos contenido JSON de forma segura
      const data = res.headers.get("content-type")?.includes("application/json")
        ? await res.json()
        : null;

      if (!res.ok) {
        toast.error(data?.message || "Error al actualizar");
        return;
      }

      toast.success(data?.message || "Usuario actualizado");
      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Error de conexión con el servidor");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pro-modal-overlay" onClick={onClose}>
      <div className="pro-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header Minimalista */}
        <div className="pro-modal-header">
          <div>
            <h3 className="pro-modal-title">Modificar Perfil</h3>
            <p className="pro-modal-subtitle">
              Actualiza las credenciales y el estado operativo en Experis.
            </p>
          </div>
          <button className="pro-close-btn" onClick={onClose} title="Cerrar">
            <X size={14} />
          </button>
        </div>

        {/* Cuerpo del Formulario */}
        <div className="pro-modal-body">
          <div className="pro-form-grid col-2">
            <InputField
              icon={<User size={13} />}
              name="nombre"
              placeholder="Nombre"
              value={form.nombre}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            <InputField
              icon={<User size={13} />}
              name="apellido"
              placeholder="Apellido"
              value={form.apellido}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div className="pro-form-grid doc-row">
            <div className="pro-input-wrapper">
              <div className="pro-input-icon">
                <CreditCard size={13} />
              </div>
              <select
                name="tipoDocumento"
                value={form.tipoDocumento}
                onChange={handleChange}
                className="pro-select"
                disabled={isSubmitting}
              >
                <option value="DNI">DNI</option>
                <option value="Pasaporte">PAS</option>
                <option value="CE">C.E</option>
              </select>
              <div className="pro-select-chevron" />
            </div>

            <InputField
              icon={<Hash size={13} />}
              name="numeroDocumento"
              placeholder="Número de documento"
              value={form.numeroDocumento}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <InputField
            icon={<Mail size={13} />}
            name="correo"
            type="email"
            placeholder="Correo electrónico"
            value={form.correo}
            onChange={handleChange}
            disabled={isSubmitting}
          />

          <InputField
            icon={<Phone size={13} />}
            name="celular"
            placeholder="Celular (9 dígitos)"
            maxLength={9}
            value={form.celular}
            onChange={handleChange}
            disabled={isSubmitting}
          />

          {/* Tarjeta de Estado Versión Pro Minimalista */}
          <div
            className={`pro-status-card ${form.activo ? "is-active" : "is-inactive"}`}
            onClick={!isSubmitting ? toggleActivo : undefined}
          >
            <div className="pro-status-left">
              <div className="pro-status-avatar">
                <ShieldCheck size={14} />
              </div>
              <div>
                <div className="pro-status-title">Estado del acceso</div>
                <div className="pro-status-subtitle">
                  {form.activo
                    ? "Cuenta totalmente operativa"
                    : "Acceso revocado temporalmente"}
                </div>
              </div>
            </div>

            <div className={`pro-switch ${form.activo ? "on" : "off"}`}>
              <div className="pro-switch-handle" />
            </div>
          </div>
        </div>

        {/* Footer Unificado */}
        <div className="pro-modal-footer">
          <button
            className="pro-btn pro-btn-secondary"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancelar
          </button>
          <button
            className="pro-btn pro-btn-primary"
            onClick={editarUsuario}
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={13} className="pro-spinner" />
                <span>Guardando...</span>
              </>
            ) : (
              "Guardar Cambios"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function InputField({ icon, ...props }) {
  return (
    <div className="pro-input-wrapper">
      <div className="pro-input-icon">{icon}</div>
      <input {...props} className="pro-input" autoComplete="off" required />
    </div>
  );
}
