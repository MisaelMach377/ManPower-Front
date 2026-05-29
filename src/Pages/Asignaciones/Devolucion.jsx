import { useEffect, useState } from "react";
import {
  X,
  ClipboardCheck,
  CalendarDays,
  FileText,
  ShieldCheck,
} from "lucide-react";

import toast from "react-hot-toast";

export default function Devolucion({
  open,
  onClose,
  asignacion,
  obtenerAsignaciones,
}) {
  const [hoverGuardar, setHoverGuardar] = useState(false);

  const [form, setForm] = useState({
    estadoDevolucion: "DEVUELTO",
    observacionDevolucion: "",
    fechaDevolucion: "",
  });

  useEffect(() => {
    if (asignacion) {
      setForm({
        estadoDevolucion: asignacion.estadoDevolucion || "DEVUELTO",

        observacionDevolucion: asignacion.observacionDevolucion || "",

        fechaDevolucion: asignacion.fechaDevolucion
          ? asignacion.fechaDevolucion.split("T")[0]
          : new Date().toISOString().split("T")[0],
      });
    }
  }, [asignacion]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const guardarDevolucion = async () => {
    try {
      const payload = {
        ...asignacion,

        estadoDevolucion: form.estadoDevolucion,
        observacionDevolucion: form.observacionDevolucion,
        fechaDevolucion: form.fechaDevolucion,

        estado:
          form.estadoDevolucion === "DEVUELTO" ? "INACTIVO" : asignacion.estado,
      };

      const res = await fetch(
        `https://localhost:44382/api/AsignacionesApi/${asignacion.id}`,
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
        toast.error(data?.message || "Error actualizando devolución");
        return;
      }

      toast.success("Devolución registrada 🔥");

      obtenerAsignaciones();
      onClose();
    } catch (err) {
      toast.error("Error del servidor");
    }
  };

  const overlayStyle = {
    position: "fixed",
    inset: 0,
    background: "rgba(15,23,42,0.55)",
    backdropFilter: "blur(6px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    padding: "20px",
  };

  const modalStyle = {
    width: "100%",
    maxWidth: "520px",
    background: "#fff",
    borderRadius: "20px",
    overflow: "hidden",
    border: "1px solid #e2e8f0",
    boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
    animation: "fadeIn .2s ease",
  };

  const headerStyle = {
    padding: "22px",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const titleStyle = {
    fontSize: "18px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "4px",
  };

  const subtitleStyle = {
    fontSize: "13px",
    color: "#64748b",
  };

  const closeBtn = {
    border: "none",
    background: "#f1f5f9",
    width: "34px",
    height: "34px",
    borderRadius: "10px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: ".2s",
  };

  const bodyStyle = {
    padding: "22px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  const inputWrapper = {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  };

  const labelStyle = {
    fontSize: "12px",
    fontWeight: "600",
    color: "#475569",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  };

  const inputStyle = {
    border: "1px solid #dbe2ea",
    borderRadius: "12px",
    padding: "11px 14px",
    fontSize: "14px",
    outline: "none",
    transition: ".2s",
  };

  const textareaStyle = {
    ...inputStyle,
    resize: "none",
    minHeight: "110px",
    fontFamily: "inherit",
  };

  const footerStyle = {
    padding: "20px 22px",
    borderTop: "1px solid #e2e8f0",
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  };

  const btnSecondary = {
    padding: "10px 16px",
    borderRadius: "10px",
    border: "1px solid #dbe2ea",
    background: "#fff",
    cursor: "pointer",
    fontWeight: "600",
  };

  const btnPrimary = {
    padding: "10px 16px",
    borderRadius: "10px",
    border: "none",
    background: hoverGuardar ? "#1d4ed8" : "#2563eb",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: ".2s",
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div style={headerStyle}>
          <div>
            <div style={titleStyle}>Registrar devolución</div>

            <div style={subtitleStyle}>
              {asignacion?.usuario} ·{" "}
              {asignacion?.laptop ||
                asignacion?.celular ||
                asignacion?.herramienta}
            </div>
          </div>

          <button style={closeBtn} onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {/* BODY */}
        <div style={bodyStyle}>
          {/* ESTADO */}
          <div style={inputWrapper}>
            <label style={labelStyle}>
              <ShieldCheck size={14} />
              Estado devolución
            </label>

            <select
              name="estadoDevolucion"
              value={form.estadoDevolucion}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="DEVUELTO">DEVUELTO</option>
              <option value="OBSERVADO">OBSERVADO</option>
              <option value="INCOMPLETO">INCOMPLETO</option>
            </select>
          </div>

          {/* FECHA */}
          <div style={inputWrapper}>
            <label style={labelStyle}>
              <CalendarDays size={14} />
              Fecha devolución
            </label>

            <input
              type="text"
              name="fechaDevolucion"
              value={
                form.fechaDevolucion
                  ? form.fechaDevolucion.split("-").reverse().join("/")
                  : ""
              }
              onChange={(e) => {
                const value = e.target.value;

                const partes = value.split("/");

                if (partes.length === 3) {
                  const fechaFormateada = `${partes[2]}-${partes[1]}-${partes[0]}`;

                  setForm({
                    ...form,
                    fechaDevolucion: fechaFormateada,
                  });
                } else {
                  setForm({
                    ...form,
                    fechaDevolucion: value,
                  });
                }
              }}
              placeholder="dd/mm/yyyy"
              style={inputStyle}
            />
          </div>

          {/* OBS */}
          <div style={inputWrapper}>
            <label style={labelStyle}>
              <FileText size={14} />
              Observaciones
            </label>

            <textarea
              name="observacionDevolucion"
              value={form.observacionDevolucion}
              onChange={handleChange}
              placeholder="Ej: equipo entregado con desgaste..."
              style={textareaStyle}
            />
          </div>
        </div>

        {/* FOOTER */}
        <div style={footerStyle}>
          <button style={btnSecondary} onClick={onClose}>
            Cancelar
          </button>

          <button
            style={btnPrimary}
            onMouseEnter={() => setHoverGuardar(true)}
            onMouseLeave={() => setHoverGuardar(false)}
            onClick={guardarDevolucion}
          >
            <ClipboardCheck size={15} />
            Guardar devolución
          </button>
        </div>
      </div>
    </div>
  );
}
