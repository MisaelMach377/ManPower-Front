import React, { useState } from "react";
import {
  X,
  Wrench,
  Layers,
  Hash,
  DollarSign,
  Package,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

import "./CrearHerramienta.css";

export default function CrearHerramienta({ open, onClose, onCreated }) {
  const [form, setForm] = useState({
    descripcion: "",
    unidadMedida: "Unid",
    familia: "",
    stock: "",
    precio: "",
    categoria: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validaciones rápidas en caliente para números
    if (name === "stock" && !/^\d*$/.test(value)) return;
    if (name === "precio" && !/^\d*\.?\d*$/.test(value)) return;

    setForm({
      ...form,
      [name]: value,
    });
  };

  // Validación idéntica a usuarios adaptada a datos de negocio de herramientas
  const isValid =
    form.descripcion.trim() &&
    form.unidadMedida.trim() &&
    form.stock.trim() &&
    Number(form.stock) >= 0 &&
    form.precio.trim() &&
    Number(form.precio) >= 0 &&
    form.categoria.trim();

  const crearHerramienta = async () => {
    if (!isValid || isSubmitting) return;

    try {
      setIsSubmitting(true);

      // Mapeamos el payload convirtiendo los strings numéricos
      const payload = {
        ...form,
        stock: parseInt(form.stock, 10),
        precio: parseFloat(form.precio),
        estado: true, // Se crea como activa por defecto
      };

      const res = await fetch("https://localhost:44382/api/HerramientasApi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = res.headers.get("content-type")?.includes("application/json")
        ? await res.json()
        : null;

      if (!res.ok) {
        toast.error(data?.message || "Error creando herramienta");
        return;
      }

      toast.success(data?.message || "Herramienta registrada correctamente");

      // Reset idéntico al de usuarios
      setForm({
        descripcion: "",
        unidadMedida: "Unid",
        familia: "",
        stock: "",
        precio: "",
        categoria: "",
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
        {/* Header Minimalista Sincronizado */}
        <div className="pro-modal-header">
          <div>
            <h3 className="pro-modal-title">Nueva Herramienta</h3>
            <p className="pro-modal-subtitle">
              Agrega un nuevo insumo o equipo al inventario maestro de Experis.
            </p>
          </div>
          <button className="pro-close-btn" onClick={onClose} title="Cerrar">
            <X size={14} />
          </button>
        </div>

        {/* Cuerpo del Formulario */}
        <div className="pro-modal-body">
          {/* Descripción */}
          <InputField
            icon={<Wrench size={13} />}
            name="descripcion"
            placeholder="Descripción de la herramienta"
            value={form.descripcion}
            onChange={handleChange}
            disabled={isSubmitting}
          />

          {/* Fila Doble: Familia y Categoría */}
          <div className="pro-form-grid col-2">
            <InputField
              icon={<Layers size={13} />}
              name="familia"
              placeholder="Familia / Grupo"
              value={form.familia}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            <InputField
              icon={<Package size={13} />}
              name="categoria"
              placeholder="Categoría"
              value={form.categoria}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          {/* Fila Especial: Unidad de Medida (Dropdown) y Stock */}
          <div className="pro-form-grid doc-row">
            <div className="pro-input-wrapper">
              <div className="pro-input-icon">
                <Package size={13} />
              </div>
              <select
                name="unidadMedida"
                value={form.unidadMedida}
                onChange={handleChange}
                className="pro-select"
                disabled={isSubmitting}
              >
                <option value="Unid">UNID</option>
                <option value="Metros">METROS</option>
                <option value="Cajas">CAJAS</option>
                <option value="Global">GLOBAL</option>
              </select>
              <div className="pro-select-chevron" />
            </div>

            <InputField
              icon={<Hash size={13} />}
              name="stock"
              placeholder="Stock Inicial"
              value={form.stock}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          {/* Precio Unitario */}
          <InputField
            icon={<DollarSign size={13} />}
            name="precio"
            placeholder="Precio Unitario (S/)"
            value={form.precio}
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
            onClick={crearHerramienta}
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={13} className="pro-spinner" />
                <span>Guardando...</span>
              </>
            ) : (
              "Registrar Item"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* Componente Interno Optimizador de Markup (Igual al de Usuarios) */
function InputField({ icon, ...props }) {
  return (
    <div className="pro-input-wrapper">
      <div className="pro-input-icon">{icon}</div>
      <input {...props} className="pro-input" autoComplete="off" required />
    </div>
  );
}
