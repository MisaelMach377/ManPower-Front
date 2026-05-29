import React, { useState } from "react";
import { X, User, Mail, Phone, Hash, CreditCard, Loader2 } from "lucide-react";
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "celular" && !/^\d*$/.test(value)) return;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const isValid =
    form.nombre.trim() &&
    form.apellido.trim() &&
    form.numeroDocumento.trim() &&
    form.correo.trim() &&
    form.celular?.length === 9;

  const crearUsuario = async () => {
    if (!isValid || isSubmitting) return;

    try {
      setIsSubmitting(true);
      const res = await fetch("https://localhost:44382/api/UsuariosApi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = res.headers.get("content-type")?.includes("application/json")
        ? await res.json()
        : null;

      if (!res.ok) {
        toast.error(data?.message || "Error creando usuario");
        return;
      }

      toast.success(data?.message || "Usuario registrado correctamente");

      setForm({
        nombre: "",
        apellido: "",
        tipoDocumento: "DNI",
        numeroDocumento: "",
        correo: "",
        celular: "",
      });

      onClose();
      onCreated();
    } catch (err) {
      console.error(err);
      toast.error("Error de conexión con el servidor");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="pro-modal-overlay" onClick={onClose}>
      <div className="pro-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header Minimalista */}
        <div className="pro-modal-header">
          <div>
            <h3 className="pro-modal-title">Nuevo Usuario</h3>
            <p className="pro-modal-subtitle">
              Registra las credenciales de acceso para el personal de Experis.
            </p>
          </div>
          <button className="pro-close-btn" onClick={onClose} title="Cerrar">
            <X size={14} />
          </button>
        </div>

        {/* Formulario Estilizado */}
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
                <option value="Pasaporte">PASAPORTE</option>
                <option value="CE">C.E.</option>
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
            placeholder="Correo electrónico institucional"
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
        </div>

        {/* Footer Unificado Sin Cortes Visuales */}
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
            onClick={crearUsuario}
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={13} className="pro-spinner" />
                <span>Guardando...</span>
              </>
            ) : (
              "Crear Cuenta"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* Componente Interno Optimizador de Markup */
function InputField({ icon, ...props }) {
  return (
    <div className="pro-input-wrapper">
      <div className="pro-input-icon">{icon}</div>
      <input {...props} className="pro-input" autoComplete="off" required />
    </div>
  );
}
