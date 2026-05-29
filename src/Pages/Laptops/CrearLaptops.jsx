import { X, Laptop, Hash, Building2, Package } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import "./CrearLaptops.css";

const initialForm = {
  marca: "",
  modelo: "",
  serie: "",
  proveedor: "",
  observaciones: "",
  estado: "Activo",
};

export default function CrearLaptop({ open, onClose, onCreated }) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (open) {
      setForm({
        ...initialForm,
        estado: "Activo",
      });
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isValid = form.marca && form.modelo && form.serie && form.proveedor;

  const crearLaptop = async () => {
    if (!isValid) {
      toast.error("Completa los campos");
      return;
    }

    try {
      const res = await fetch("https://localhost:44382/api/LaptopsApi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Error creando laptop");
        return;
      }

      toast.success("Laptop creada 🔥");

      onClose();
      onCreated();
    } catch (err) {
      console.log(err);
      toast.error("Error de servidor");
    }
  };

  if (!open) return null;

  return (
    <div className="crear-laptop-overlay" onClick={onClose}>
      <div className="crear-laptop-modal" onClick={(e) => e.stopPropagation()}>
        <button className="crear-laptop-close" onClick={onClose}>
          <X size={16} />
        </button>

        <div className="crear-laptop-header">
          <h3 className="crear-laptop-title">Nueva laptop</h3>

          <p className="crear-laptop-subtitle">
            Registra una laptop en inventario
          </p>
        </div>

        <div className="crear-laptop-inner">
          <div className="crear-laptop-form">
            <Input
              icon={<Laptop size={14} />}
              name="marca"
              placeholder="Marca"
              value={form.marca}
              onChange={handleChange}
            />

            <Input
              icon={<Package size={14} />}
              name="modelo"
              placeholder="Modelo"
              value={form.modelo}
              onChange={handleChange}
            />

            <Input
              icon={<Hash size={14} />}
              name="serie"
              placeholder="Serie"
              value={form.serie}
              onChange={handleChange}
            />

            <Input
              icon={<Building2 size={14} />}
              name="proveedor"
              placeholder="Proveedor"
              value={form.proveedor}
              onChange={handleChange}
            />

            <textarea
              className="l-textarea"
              name="observaciones"
              placeholder="Observaciones"
              value={form.observaciones}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="crear-laptop-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancelar
          </button>

          <button
            className="btn-primary"
            onClick={crearLaptop}
            disabled={!isValid}
          >
            Guardar laptop
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ icon, ...props }) {
  return (
    <div className="l-input-wrap">
      <div className="l-input-icon">{icon}</div>

      <input {...props} className="l-input" />
    </div>
  );
}
