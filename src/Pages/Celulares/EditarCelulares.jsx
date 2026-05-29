import {
  X,
  Smartphone,
  Hash,
  Phone,
  Building2,
  ShieldCheck,
  Package,
} from "lucide-react";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import "./EditarCelular.css";

const initialForm = {
  id: 0,
  marca: "",
  modelo: "",
  imei: "",
  operacion: "Asignación",
  celular: "",
  proveedor: "",
  estado: "Activo",
};

export default function EditarCelular({ open, onClose, celular, onUpdated }) {
  const [form, setForm] = useState(initialForm);

  // 🔥 CARGA DATOS AL ABRIR
  useEffect(() => {
    if (celular) {
      setForm({
        ...celular,
        celular: celular.celular ?? "",
      });
    }
  }, [celular]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleCelular = (e) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value.length <= 9) {
      setForm({ ...form, celular: value });
    }
  };

  const isValid =
    form.marca && form.modelo && form.imei && form.celular.length === 9;

  const editarCelular = async () => {
    if (!isValid) {
      toast.error("Completa bien los campos");
      return;
    }

    try {
      const res = await fetch(
        `https://localhost:44382/api/CelularesApi/${form.id}`,
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

      toast.success("Celular actualizado correctamente");
      onUpdated();
      onClose();
    } catch (err) {
      console.log(err);
      toast.error("Error del servidor");
    }
  };

  const systemFont =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial';

  return (
    <div className="editar-celular-overlay" onClick={onClose}>
      <div
        className="editar-celular-modal"
        style={{ fontFamily: systemFont }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button className="editar-celular-close" onClick={onClose}>
          <X size={16} />
        </button>

        {/* HEADER */}
        <div className="editar-celular-header">
          <h3 className="editar-celular-title">Editar celular</h3>
          <p className="editar-celular-subtitle">
            Actualiza los datos del celular
          </p>
        </div>

        {/* FORM */}
        <div className="editar-celular-form">
          <Input
            icon={<Smartphone size={14} />}
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
            name="imei"
            placeholder="IMEI"
            value={form.imei}
            onChange={handleChange}
          />

          <Input
            icon={<Phone size={14} />}
            name="celular"
            placeholder="Número celular"
            value={form.celular}
            onChange={handleCelular}
            maxLength={9}
          />

          {/* OPERACION */}
          <div className="editar-celular-input-wrap">
            <div className="editar-celular-icon">
              <ShieldCheck size={14} />
            </div>

            <select
              name="operacion"
              value={form.operacion}
              onChange={handleChange}
              className="editar-celular-select"
            >
              <option value="Asignación">Asignación</option>
              <option value="Devolución">Devolución</option>
              <option value="Cambio">Cambio</option>
              <option value="Baja">Baja</option>
            </select>
          </div>

          <Input
            icon={<Building2 size={14} />}
            name="proveedor"
            placeholder="Proveedor"
            value={form.proveedor}
            onChange={handleChange}
          />

          {/* ESTADO */}
          <div className="editar-celular-input-wrap">
            <div className="editar-celular-icon">
              <ShieldCheck size={14} />
            </div>

            <select
              name="estado"
              value={form.estado}
              onChange={handleChange}
              className="editar-celular-select"
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
              <option value="Reparación">Reparación</option>
              <option value="Perdido">Perdido</option>
            </select>
          </div>
        </div>

        {/* FOOTER */}
        <div className="editar-celular-footer">
          <button onClick={onClose} className="editar-celular-btn-secondary">
            Cancelar
          </button>

          <button
            onClick={editarCelular}
            disabled={!isValid}
            className="editar-celular-btn-primary"
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
    <div className="editar-celular-input-wrap">
      <div className="editar-celular-icon">{icon}</div>

      <input {...props} className="editar-celular-input" />
    </div>
  );
}
