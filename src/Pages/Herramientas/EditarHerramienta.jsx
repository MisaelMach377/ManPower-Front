import React, { useEffect, useState } from "react";
import {
  X,
  Wrench,
  Package,
  Layers3,
  Boxes,
  DollarSign,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

import "./EditarHerramienta.css";

export default function EditarHerramienta({
  open,
  onClose,
  herramienta,
  onUpdated,
}) {
  const [form, setForm] = useState({
    id: 0,
    descripcion: "",
    unidadMedida: "Unidad",
    familia: "",
    stock: "",
    precio: "",
    categoria: "Manual",
    estado: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open && herramienta) {
      setForm({
        ...herramienta,
        stock: herramienta.stock ?? "",
        precio: herramienta.precio ?? "",
      });
    }
  }, [open, herramienta]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]:
        name === "stock" || name === "precio"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    });
  };

  const toggleEstado = () => {
    setForm((prev) => ({ ...prev, estado: !prev.estado }));
  };

  const isValid =
    form.descripcion?.trim() && form.stock !== "" && form.precio !== "";

  const editarHerramienta = async () => {
    if (!isValid || isSubmitting) return;

    try {
      setIsSubmitting(true);
      const payload = {
        ...form,
        stock: Number(form.stock),
        precio: Number(form.precio),
      };

      const res = await fetch(
        `https://localhost:44382/api/HerramientasApi/${form.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = res.headers.get("content-type")?.includes("application/json")
        ? await res.json()
        : null;

      if (!res.ok) {
        toast.error(data?.message || "Error al actualizar");
        return;
      }

      toast.success(data?.message || "Herramienta actualizada 🔥");
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
            <h3 className="pro-modal-title">Editar herramienta</h3>
            <p className="pro-modal-subtitle">
              Actualiza la información y estado operativo de la herramienta.
            </p>
          </div>
          <button className="pro-close-btn" onClick={onClose} title="Cerrar">
            <X size={14} />
          </button>
        </div>

        {/* Cuerpo del Formulario */}
        <div className="pro-modal-body">
          <InputField
            icon={<Wrench size={13} />}
            name="descripcion"
            placeholder="Descripción"
            value={form.descripcion}
            onChange={handleChange}
            disabled={isSubmitting}
          />

          <div className="pro-form-grid col-2">
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
                <option value="Unidad">Unidad</option>
                <option value="Centímetros">Centímetros</option>
                <option value="Metros">Metros</option>
                <option value="Kilogramos">Kilogramos</option>
                <option value="Litros">Litros</option>
                <option value="Caja">Caja</option>
                <option value="Paquete">Paquete</option>
                <option value="Juego">Juego</option>
              </select>
              <div className="pro-select-chevron" />
            </div>

            <InputField
              icon={<Layers3 size={13} />}
              name="familia"
              placeholder="Familia"
              value={form.familia}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div className="pro-form-grid col-2">
            <InputField
              icon={<Boxes size={13} />}
              type="number"
              name="stock"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
              disabled={isSubmitting}
            />

            <InputField
              icon={<DollarSign size={13} />}
              type="number"
              step="0.01"
              name="precio"
              placeholder="Precio"
              value={form.precio}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div className="pro-input-wrapper">
            <div className="pro-input-icon">
              <Package size={13} />
            </div>
            <select
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
              className="pro-select"
              disabled={isSubmitting}
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
            <div className="pro-select-chevron" />
          </div>

          {/* Tarjeta de Estado Premium */}
          <div
            className={`pro-status-card ${form.estado ? "is-active" : "is-inactive"}`}
            onClick={!isSubmitting ? toggleEstado : undefined}
          >
            <div className="pro-status-left">
              <div className="pro-status-avatar">
                <ShieldCheck size={14} />
              </div>
              <div>
                <div className="pro-status-title">Estado de la herramienta</div>
                <div className="pro-status-subtitle">
                  {form.estado
                    ? "Herramienta habilitada"
                    : "Herramienta desactivada"}
                </div>
              </div>
            </div>

            <div className={`pro-switch ${form.estado ? "on" : "off"}`}>
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
            onClick={editarHerramienta}
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={13} className="pro-spinner" />
                <span>Guardando...</span>
              </>
            ) : (
              "Guardar cambios"
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
