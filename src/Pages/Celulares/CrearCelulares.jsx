import {
  X,
  Smartphone,
  Hash,
  Phone,
  Building2,
  ShieldCheck,
  Package,
} from "lucide-react";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import "./CrearCelulares.css";

const initialForm = {
  marca: "",
  modelo: "",
  imei: "",
  operacion: "Asignación",
  celular: "",
  proveedor: "",
  estado: "Activo",
};

export default function CrearCelular({ open, onClose, onCreated }) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (open) {
      setForm(initialForm);
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const isValid =
    form.marca && form.modelo && form.imei && form.celular.length === 9;

  const crearCelular = async () => {
    if (!isValid) {
      toast.error("Completa los campos");
      return;
    }

    try {
      const res = await fetch("https://localhost:44382/api/CelularesApi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Error creando celular");
        return;
      }

      toast.success("Celular creado 🔥");

      onClose();
      onCreated();
    } catch (err) {
      console.log(err);
      toast.error("Error de servidor");
    }
  };

  if (!open) return null;

  return (
    <div className="crear-celular-overlay" onClick={onClose}>
      <div className="crear-celular-modal" onClick={(e) => e.stopPropagation()}>
        <button className="crear-celular-close" onClick={onClose}>
          <X size={16} />
        </button>

        <div className="crear-celular-header">
          <h3 className="crear-celular-title">Nuevo celular</h3>

          <p className="crear-celular-subtitle">
            Registra un celular en inventario
          </p>
        </div>

        <div className="crear-celular-inner">
          <div className="crear-celular-form">
            <div className="input-group">
              <label>Marca</label>

              <div className="input-with-icon">
                <Smartphone size={14} className="input-icon" />

                <select
                  name="marca"
                  value={form.marca}
                  onChange={handleChange}
                  className="input-system"
                  required
                >
                  <option value="">Seleccionar marca</option>

                  <option value="HONOR">HONOR</option>
                  <option value="HUAWEI">HUAWEI</option>
                  <option value="MOTOROLA">MOTOROLA</option>
                  <option value="OPPO">OPPO</option>
                  <option value="REDMI">REDMI</option>
                  <option value="SAMSUNG">SAMSUNG</option>
                  <option value="ZTE">ZTE</option>
                  <option value="XIAOMI">XIAOMI</option>
                </select>
              </div>
            </div>

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
              maxLength={9}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");

                if (value.length <= 9) {
                  setForm({
                    ...form,
                    celular: value,
                  });
                }
              }}
            />

            <div className="c-input-wrap">
              <div className="c-input-icon">
                <ShieldCheck size={14} />
              </div>

              <select
                className="c-select"
                name="operacion"
                value={form.operacion}
                onChange={handleChange}
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

            <div className="c-input-wrap">
              <div className="c-input-icon">
                <ShieldCheck size={14} />
              </div>

              <select
                className="c-select"
                name="estado"
                value={form.estado}
                onChange={handleChange}
              >
                <option value="Activo">Activo</option>

                <option value="Inactivo">Inactivo</option>

                <option value="Reparación">Reparación</option>

                <option value="Perdido">Perdido</option>
              </select>
            </div>
          </div>
        </div>

        <div className="crear-celular-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancelar
          </button>

          <button
            className="btn-primary"
            onClick={crearCelular}
            disabled={!isValid}
          >
            Guardar celular
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ icon, ...props }) {
  return (
    <div className="c-input-wrap">
      <div className="c-input-icon">{icon}</div>

      <input {...props} className="c-input" />
    </div>
  );
}
