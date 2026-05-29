import { X, Wrench, Package, Layers3, Boxes, DollarSign } from "lucide-react";

import { useState } from "react";
import toast from "react-hot-toast";

import "./CrearHerramienta.css";

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

  const isValid = form.descripcion && form.stock !== "" && form.precio !== "";

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

  return (
    <div className="crear-herramienta-overlay" onClick={onClose}>
      <div
        className="crear-herramienta-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="crear-herramienta-close" onClick={onClose}>
          <X size={16} strokeWidth={2.5} />
        </button>

        <div className="crear-herramienta-header">
          <h3 className="crear-herramienta-title">Nueva herramienta</h3>

          <p className="crear-herramienta-subtitle">
            Registra una nueva herramienta en inventario.
          </p>
        </div>

        <div className="crear-herramienta-form">
          <Input
            icon={<Wrench size={14} />}
            name="descripcion"
            placeholder="Descripción"
            onChange={handleChange}
            value={form.descripcion}
          />

          <div className="crear-herramienta-row">
            <div style={{ flex: 1 }}>
              <div className="h-input-wrap">
                <div className="h-input-icon">
                  <Package size={14} />
                </div>

                <select
                  className="h-select"
                  name="unidadMedida"
                  value={form.unidadMedida}
                  onChange={handleChange}
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

          <div className="crear-herramienta-row">
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

          <div className="h-input-wrap">
            <div className="h-input-icon">
              <Package size={14} />
            </div>

            <select
              className="h-select"
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
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

        <div className="crear-herramienta-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancelar
          </button>

          <button
            className="btn-primary"
            onClick={crearHerramienta}
            disabled={!isValid}
          >
            Guardar herramienta
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ icon, ...props }) {
  return (
    <div className="h-input-wrap">
      <div className="h-input-icon">{icon}</div>

      <input {...props} className="h-input" required />
    </div>
  );
}
