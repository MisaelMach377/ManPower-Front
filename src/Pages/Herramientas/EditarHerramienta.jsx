import {
  X,
  Wrench,
  Package,
  Layers3,
  Boxes,
  DollarSign,
  ShieldCheck,
} from "lucide-react";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (herramienta) {
      setForm({
        ...herramienta,
        stock: herramienta.stock ?? "",
        precio: herramienta.precio ?? "",
      });
    }
  }, [herramienta]);

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

  const editarHerramienta = async () => {
    if (!isValid) {
      toast.error("Completa bien los campos");
      return;
    }

    try {
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

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Error actualizando");
        return;
      }

      toast.success(data?.message || "Herramienta actualizada 🔥");

      onUpdated();
      onClose();
    } catch (err) {
      console.log(err);
      toast.error("Error del servidor");
    }
  };

  const isValid = form.descripcion && form.stock !== "" && form.precio !== "";

  const systemFont =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

  return (
    <div className="editar-herramienta-overlay" onClick={onClose}>
      <div
        className="editar-herramienta-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="editar-herramienta-close" onClick={onClose}>
          <X size={16} strokeWidth={2.5} />
        </button>

        <div className="editar-herramienta-header">
          <h3 className="editar-herramienta-title">Editar herramienta</h3>

          <p className="editar-herramienta-subtitle">
            Actualiza la información y estado de la herramienta.
          </p>
        </div>

        <div className="editar-herramienta-form">
          <Input
            icon={<Wrench size={14} />}
            name="descripcion"
            placeholder="Descripción"
            value={form.descripcion}
            onChange={handleChange}
          />

          <div className="editar-herramienta-row">
            <div className="editar-herramienta-flex">
              <div className="editar-herramienta-input-wrap">
                <div className="editar-herramienta-icon">
                  <Package size={14} />
                </div>

                <select
                  name="unidadMedida"
                  value={form.unidadMedida}
                  onChange={handleChange}
                  className="editar-herramienta-select"
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

            <div className="editar-herramienta-flex">
              <Input
                icon={<Layers3 size={14} />}
                name="familia"
                placeholder="Familia"
                value={form.familia}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="editar-herramienta-row">
            <div className="editar-herramienta-flex">
              <Input
                icon={<Boxes size={14} />}
                type="number"
                name="stock"
                placeholder="Stock"
                value={form.stock}
                onChange={handleChange}
              />
            </div>

            <div className="editar-herramienta-flex">
              <Input
                icon={<DollarSign size={14} />}
                type="number"
                step="0.01"
                name="precio"
                placeholder="Precio"
                value={form.precio}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="editar-herramienta-input-wrap">
            <div className="editar-herramienta-icon">
              <Package size={14} />
            </div>

            <select
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
              className="editar-herramienta-select"
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

          <div
            className={`estado-herramienta ${
              form.estado ? "activo" : "inactivo"
            }`}
            onClick={() =>
              setForm({
                ...form,
                estado: !form.estado,
              })
            }
          >
            <div className="estado-herramienta-left">
              <div
                className={`estado-herramienta-icon ${
                  form.estado ? "activo" : "inactivo"
                }`}
              >
                <ShieldCheck size={16} />
              </div>

              <div>
                <div className="estado-herramienta-title">
                  Estado de la herramienta
                </div>

                <div className="estado-herramienta-subtitle">
                  {form.estado
                    ? "Herramienta habilitada"
                    : "Herramienta desactivada"}
                </div>
              </div>
            </div>

            <div
              className={`estado-herramienta-switch ${
                form.estado ? "activo" : "inactivo"
              }`}
            >
              <div
                className={`estado-herramienta-ball ${
                  form.estado ? "activo" : "inactivo"
                }`}
              />
            </div>
          </div>
        </div>

        <div className="editar-herramienta-footer">
          <button onClick={onClose} className="btn-herramienta-cancelar">
            Cancelar
          </button>

          <button
            onClick={editarHerramienta}
            disabled={!isValid}
            className="btn-herramienta-guardar"
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
    <div className="editar-herramienta-input-wrap">
      <div className="editar-herramienta-icon">{icon}</div>

      <input {...props} className="editar-herramienta-input" />
    </div>
  );
}
