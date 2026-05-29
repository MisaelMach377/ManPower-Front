import { X, Laptop, Hash, Building2, ShieldCheck, Package } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const initialForm = {
  id: 0,
  marca: "",
  modelo: "",
  serie: "",
  proveedor: "",
  observaciones: "",
  estado: "Activo",
};

import "./EditarLaptop.css";

export default function EditarLaptop({ open, onClose, laptop, onUpdated }) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (laptop) setForm(laptop);
  }, [laptop]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const isValid = form.marca && form.modelo && form.serie;

  const editarLaptop = async () => {
    if (!isValid) {
      toast.error("Completa los campos");
      return;
    }

    try {
      const res = await fetch(
        `https://localhost:44382/api/LaptopsApi/${form.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Error actualizando");
        return;
      }

      toast.success("Laptop actualizada 🔥");
      onUpdated();
      onClose();
    } catch {
      toast.error("Error del servidor");
    }
  };

  const systemFont =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial';

  return (
    <div className="editar-laptop-overlay" onClick={onClose}>
      <div
        className="editar-laptop-modal"
        style={{ fontFamily: systemFont }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button className="editar-laptop-close-btn" onClick={onClose}>
          <X size={16} />
        </button>

        {/* HEADER */}
        <div className="editar-laptop-header">
          <h3 className="editar-laptop-title">Editar laptop</h3>
          <p className="editar-laptop-subtitle">
            Actualiza los datos del equipo
          </p>
        </div>

        {/* FORM */}
        <div className="editar-laptop-form">
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
            name="observaciones"
            placeholder="Observaciones"
            value={form.observaciones}
            onChange={handleChange}
            className="editar-laptop-textarea"
          />

          <div className="editar-laptop-input-wrap">
            <div className="editar-laptop-icon">
              <ShieldCheck size={14} />
            </div>

            <select
              name="estado"
              value={form.estado}
              onChange={handleChange}
              className="editar-laptop-select"
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
              <option value="Reparación">Reparación</option>
              <option value="Perdido">Perdido</option>
            </select>
          </div>
        </div>

        {/* FOOTER */}
        <div className="editar-laptop-footer">
          <button onClick={onClose} className="editar-laptop-btn-secondary">
            Cancelar
          </button>

          <button
            onClick={editarLaptop}
            disabled={!isValid}
            className="editar-laptop-btn-primary"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}

/* INPUT */
function Input({ icon, ...props }) {
  return (
    <div className="editar-laptop-input-wrap">
      <div className="editar-laptop-icon">{icon}</div>

      <input {...props} className="editar-laptop-input" />
    </div>
  );
}
