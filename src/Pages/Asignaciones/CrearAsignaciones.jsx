import {
  X,
  User,
  Smartphone,
  Laptop,
  FileText,
  MapPin,
  ClipboardList,
  Cpu,
} from "lucide-react";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CrearAsignacion({
  open,
  onClose,
  obtenerAsignaciones,
}) {
  const [usuarios, setUsuarios] = useState([]);
  const [celulares, setCelulares] = useState([]);
  const [laptops, setLaptops] = useState([]);

  const [form, setForm] = useState({
    usuarioId: "",
    tipoHerramienta: "CELULAR",

    celularId: "",
    laptopId: "",

    numeroGuia: "",
    zona: "",
    estado: "ACTIVO",
    observaciones: "",
  });

  // =========================
  // CARGAR LISTAS
  // =========================

  useEffect(() => {
    if (open) {
      obtenerUsuarios();
      obtenerCelulares();
      obtenerLaptops();
    }
  }, [open]);

  const obtenerUsuarios = async () => {
    try {
      const res = await fetch("https://localhost:44382/api/UsuariosApi");

      const data = await res.json();

      setUsuarios(data);
    } catch (err) {
      console.log(err);
    }
  };

  const obtenerCelulares = async () => {
    try {
      const res = await fetch("https://localhost:44382/api/CelularesApi");

      const data = await res.json();

      setCelulares(data);
    } catch (err) {
      console.log(err);
    }
  };

  const obtenerLaptops = async () => {
    try {
      const res = await fetch("https://localhost:44382/api/LaptopsApi");

      const data = await res.json();

      setLaptops(data);
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  // =========================
  // CREAR
  // =========================

  const crearAsignacion = async () => {
    try {
      const payload = {
        usuarioId: Number(form.usuarioId),
        tipoHerramienta: form.tipoHerramienta,

        celularId:
          form.tipoHerramienta === "CELULAR" ? Number(form.celularId) : null,

        laptopId:
          form.tipoHerramienta === "LAPTOP" ? Number(form.laptopId) : null,

        numeroGuia: form.numeroGuia,
        zona: form.zona,
        estado: form.estado,
        observaciones: form.observaciones,
      };

      const res = await fetch("https://localhost:44382/api/AsignacionesApi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("STATUS:", res.status);

      // ✔️ LEER SOLO UNA VEZ
      const data = await res.json();
      console.log("RESPONSE:", data);

      if (!res.ok) {
        toast.error(data?.message || "Error creando asignación");
        return;
      }

      toast.success(data?.message || "Asignación creada correctamente 🔥");

      onClose();
      obtenerAsignaciones();

      // LIMPIAR FORM
      setForm({
        usuarioId: "",
        tipoHerramienta: "CELULAR",
        celularId: "",
        laptopId: "",
        numeroGuia: "",
        zona: "",
        estado: "ACTIVO",
        observaciones: "",
      });
    } catch (err) {
      console.log(err);
      toast.error("Error del servidor");
    }
  };

  if (!open) return null;

  const isValid =
    form.usuarioId &&
    ((form.tipoHerramienta === "CELULAR" && form.celularId) ||
      (form.tipoHerramienta === "LAPTOP" && form.laptopId));

  // USUARIO SELECCIONADO
  const selectedUsuario = usuarios.find((u) => u.id == form.usuarioId);

  // EQUIPO SELECCIONADO
  const selectedCelular = celulares.find((c) => c.id == form.celularId);

  const selectedLaptop = laptops.find((l) => l.id == form.laptopId);

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {/* CERRAR */}
        <button style={closeBtnStyle} onClick={onClose}>
          <X size={16} />
        </button>

        {/* HEADER */}
        <div style={headerStyle}>
          <h2 style={titleStyle}>Nueva asignación</h2>

          <p style={subtitleStyle}>
            Asigna herramientas corporativas a un colaborador.
          </p>
        </div>

        {/* FORM */}
        <div style={formStyle}>
          {/* USUARIO */}
          <SelectInput
            icon={<User size={14} />}
            name="usuarioId"
            value={form.usuarioId}
            onChange={handleChange}
          >
            <option value="">Seleccionar usuario</option>

            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nombre} {u.apellido}
              </option>
            ))}
          </SelectInput>

          {/* INFO USUARIO */}
          {selectedUsuario && (
            <div style={infoCard}>
              <div>
                <span style={infoLabel}>Documento</span>

                <div style={infoValue}>{selectedUsuario.numeroDocumento}</div>
              </div>

              <div>
                <span style={infoLabel}>Correo</span>

                <div style={infoValue}>{selectedUsuario.correo}</div>
              </div>
            </div>
          )}

          {/* TIPO */}
          <div style={rowStyle}>
            <button
              type="button"
              style={{
                ...typeBtn,
                background:
                  form.tipoHerramienta === "CELULAR" ? "#2563eb" : "#fff",

                color: form.tipoHerramienta === "CELULAR" ? "#fff" : "#111",
              }}
              onClick={() =>
                setForm({
                  ...form,
                  tipoHerramienta: "CELULAR",
                  laptopId: "",
                })
              }
            >
              <Smartphone size={15} />
              Celular
            </button>

            <button
              type="button"
              style={{
                ...typeBtn,
                background:
                  form.tipoHerramienta === "LAPTOP" ? "#2563eb" : "#fff",

                color: form.tipoHerramienta === "LAPTOP" ? "#fff" : "#111",
              }}
              onClick={() =>
                setForm({
                  ...form,
                  tipoHerramienta: "LAPTOP",
                  celularId: "",
                })
              }
            >
              <Laptop size={15} />
              Laptop
            </button>
          </div>

          {/* EQUIPOS */}
          {form.tipoHerramienta === "CELULAR" ? (
            <>
              <SelectInput
                icon={<Smartphone size={14} />}
                name="celularId"
                value={form.celularId}
                onChange={handleChange}
              >
                <option value="">Seleccionar celular</option>

                {celulares.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.marca} {c.modelo}
                  </option>
                ))}
              </SelectInput>

              {/* INFO CELULAR */}
              {selectedCelular && (
                <div style={infoCard}>
                  <div>
                    <span style={infoLabel}>Marca</span>

                    <div style={infoValue}>{selectedCelular.marca}</div>
                  </div>

                  <div>
                    <span style={infoLabel}>Modelo</span>

                    <div style={infoValue}>{selectedCelular.modelo}</div>
                  </div>

                  <div>
                    <span style={infoLabel}>IMEI</span>

                    <div style={infoValue}>{selectedCelular.imei}</div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <SelectInput
                icon={<Laptop size={14} />}
                name="laptopId"
                value={form.laptopId}
                onChange={handleChange}
              >
                <option value="">Seleccionar laptop</option>

                {laptops.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.marca} {l.modelo}
                  </option>
                ))}
              </SelectInput>

              {/* INFO LAPTOP */}
              {selectedLaptop && (
                <div style={infoCard}>
                  <div>
                    <span style={infoLabel}>Marca</span>

                    <div style={infoValue}>{selectedLaptop.marca}</div>
                  </div>

                  <div>
                    <span style={infoLabel}>Modelo</span>

                    <div style={infoValue}>{selectedLaptop.modelo}</div>
                  </div>

                  <div>
                    <span style={infoLabel}>Serie</span>

                    <div style={infoValue}>{selectedLaptop.serie}</div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* GUIA */}
          <Input
            icon={<FileText size={14} />}
            placeholder="Número de guía"
            name="numeroGuia"
            value={form.numeroGuia}
            onChange={handleChange}
          />

          {/* ZONA */}
          <Input
            icon={<MapPin size={14} />}
            placeholder="Zona"
            name="zona"
            value={form.zona}
            onChange={handleChange}
          />

          {/* OBS */}
          <textarea
            placeholder="Observaciones..."
            name="observaciones"
            value={form.observaciones}
            onChange={handleChange}
            style={textareaStyle}
          />
        </div>

        {/* FOOTER */}
        <div style={footerStyle}>
          <button style={btnSecondaryStyle} onClick={onClose}>
            Cancelar
          </button>

          <button
            disabled={!isValid}
            onClick={crearAsignacion}
            style={{
              ...btnPrimaryStyle,
              opacity: isValid ? 1 : 0.5,
              cursor: isValid ? "pointer" : "not-allowed",
            }}
          >
            <ClipboardList size={15} />
            Crear asignación
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================
INPUT
========================= */

function Input({ icon, ...props }) {
  return (
    <div style={inputWrapStyle}>
      <div style={iconStyle}>{icon}</div>

      <input {...props} style={inputStyle} />
    </div>
  );
}

/* =========================
SELECT
========================= */

function SelectInput({ icon, children, ...props }) {
  return (
    <div style={inputWrapStyle}>
      <div style={iconStyle}>{icon}</div>

      <select {...props} style={selectStyle}>
        {children}
      </select>
    </div>
  );
}

/* =========================
ESTILOS
========================= */

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.20)",
  backdropFilter: "blur(5px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};

const modalStyle = {
  width: "100%",
  maxWidth: "620px",
  background: "#fff",
  borderRadius: "16px",
  border: "1px solid #e2e8f0",
  overflow: "hidden",
  position: "relative",
  boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
};

const closeBtnStyle = {
  position: "absolute",
  top: "18px",
  right: "18px",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  color: "#64748b",
};

const headerStyle = {
  padding: "28px 28px 18px",
};

const titleStyle = {
  margin: 0,
  fontSize: "22px",
  fontWeight: "700",
  color: "#0f172a",
};

const subtitleStyle = {
  marginTop: "6px",
  fontSize: "13px",
  color: "#64748b",
};

const formStyle = {
  padding: "0 28px 28px",
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const rowStyle = {
  display: "flex",
  gap: "10px",
};

const typeBtn = {
  flex: 1,
  border: "1px solid #dbe2ea",
  borderRadius: "10px",
  padding: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  cursor: "pointer",
  fontWeight: "600",
  transition: "0.15s ease",
};

const inputWrapStyle = {
  position: "relative",
};

const iconStyle = {
  position: "absolute",
  left: "14px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#64748b",
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px 12px 42px",
  borderRadius: "10px",
  border: "1px solid #dbe2ea",
  fontSize: "13px",
  outline: "none",
  boxSizing: "border-box",
};

const selectStyle = {
  ...inputStyle,
  appearance: "none",
  cursor: "pointer",
};

const textareaStyle = {
  minHeight: "90px",
  resize: "none",
  borderRadius: "10px",
  border: "1px solid #dbe2ea",
  padding: "14px",
  fontSize: "13px",
  outline: "none",
};

const infoCard = {
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
  borderRadius: "10px",
  padding: "14px",
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
};

const infoLabel = {
  fontSize: "11px",
  color: "#64748b",
};

const infoValue = {
  marginTop: "4px",
  fontSize: "13px",
  fontWeight: "600",
  color: "#0f172a",
};

const footerStyle = {
  padding: "18px 28px",
  borderTop: "1px solid #f1f5f9",
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  background: "#fcfcfc",
};

const btnPrimaryStyle = {
  border: "none",
  background: "#2563eb",
  color: "#fff",
  padding: "11px 18px",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontWeight: "600",
};

const btnSecondaryStyle = {
  border: "1px solid #dbe2ea",
  background: "#fff",
  color: "#334155",
  padding: "11px 18px",
  borderRadius: "10px",
  cursor: "pointer",
};
