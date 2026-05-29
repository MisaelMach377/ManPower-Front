import React from "react";
import {
  ArrowUpRight,
  Laptop,
  Smartphone,
  Wrench,
  Users,
  ClipboardCheck,
  Layers3,
} from "lucide-react";

export default function HomeContent() {
  return (
    <div
      style={{
        padding: "40px",
        minHeight: "100vh",
        boxSizing: "border-box",
        fontFamily: "system-ui, -apple-system, sans-serif",
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
      }}
    >
      {/* BADGE SUPERIOR */}
      <span
        style={{
          display: "inline-block",
          fontSize: "11px",
          fontWeight: 700,
          color: "#f27405",
          backgroundColor: "rgba(242, 116, 5, 0.08)",
          padding: "5px 14px",
          borderRadius: "30px",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          marginBottom: "20px",
        }}
      >
        Portal Corporativo • Experis
      </span>

      {/* TITULO PRINCIPAL */}
      <h1
        style={{
          fontSize: "38px",
          fontWeight: 800,
          color: "#0f172a",
          margin: "0 0 12px 0",
          letterSpacing: "-0.03em",
        }}
      >
        Impulsando el Futuro Digital
      </h1>

      {/* SUBTÍTULO CON TEXTO REAL EXPERIS */}
      <p
        style={{
          fontSize: "15px",
          color: "#475569",
          lineHeight: "1.6",
          margin: "0 0 40px 0",
          maxWidth: "720px",
        }}
      >
        El crecimiento empresarial depende de contar con las personas correctas.
        Proporcionamos acceso al talento profesional de alta demanda y las
        soluciones tecnológicas especializadas necesarias para asegurar una
        ventaja competitiva en el mercado.
      </p>

      {/* GRILLA DE TARJETAS DE PROPÓSITO */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <InfoCard
          icon={<Users size={18} color="#2c8a93" />}
          title="Ventaja de Talento"
          description="Atraemos los perfiles idóneos diariamente construyendo una red global y única para soluciones eficientes."
        />
        <InfoCard
          icon={<ClipboardCheck size={18} color="#2c8a93" />}
          title="Mayor Precisión"
          description="Profundizamos en las necesidades específicas para que cada profesional calce con la cultura de tu organización."
        />
        <InfoCard
          icon={<Layers3 size={18} color="#2c8a93" />}
          title="Conocimiento Global"
          description="Presencia en 54 países cubriendo múltiples áreas críticas especializadas en IT, finanzas e ingeniería."
        />
      </div>

      {/* SECCIÓN OPERATIVA PANEL DUPLEX */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          padding: "32px",
          boxShadow: "0 12px 34px -10px rgba(15, 23, 42, 0.03)",
          display: "grid",
          gridTemplateColumns: "1.8fr 1.2fr",
          gap: "48px",
          alignItems: "start",
        }}
      >
        {/* COLUMNA IZQUIERDA: ASIGNACIONES RECIENTES */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2
              style={{
                fontSize: "17px",
                fontWeight: 700,
                color: "#0f172a",
                margin: 0,
              }}
            >
              Control de Asignaciones IT
            </h2>
            <a
              href="#historial"
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#2c8a93",
                textDecoration: "none",
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f27405")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#2c8a93")}
            >
              Ver historial completo
            </a>
          </div>

          <div
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
                fontSize: "13.5px",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "#f8fafc",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  <th
                    style={{
                      padding: "14px 16px",
                      fontWeight: 600,
                      color: "#64748b",
                    }}
                  >
                    Especialista / Consultor
                  </th>
                  <th
                    style={{
                      padding: "14px 16px",
                      fontWeight: 600,
                      color: "#64748b",
                    }}
                  >
                    Activo Asignado
                  </th>
                  <th
                    style={{
                      padding: "14px 16px",
                      fontWeight: 600,
                      color: "#64748b",
                    }}
                  >
                    Fecha
                  </th>
                  <th
                    style={{
                      padding: "14px 16px",
                      fontWeight: 600,
                      color: "#64748b",
                    }}
                  >
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                <TableRow
                  name="Carlos Mendoza"
                  role="DevOps Engineer"
                  asset="MacBook Pro 14'"
                  date="24 May 2026"
                  status="Entregado"
                  statusColor="#16a34a"
                  statusBg="#f0fdf4"
                />
                <TableRow
                  name="Ana Sophia Loli"
                  role="UI/UX Designer"
                  asset="iPhone 15 Pro"
                  date="22 May 2026"
                  status="Entregado"
                  statusColor="#16a34a"
                  statusBg="#f0fdf4"
                />
                <TableRow
                  name="Marcos Rivas"
                  role="Data Analyst"
                  asset="Kit Herramientas Pro"
                  date="19 May 2026"
                  status="Pendiente"
                  statusColor="#d97706"
                  statusBg="#fff7ed"
                />
              </tbody>
            </table>
          </div>
        </div>

        {/* COLUMNA DERECHA: GESTIÓN RÁPIDA DE RECURSOS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <h2
            style={{
              fontSize: "17px",
              fontWeight: 700,
              color: "#0f172a",
              margin: 0,
            }}
          >
            Acciones de Inventario
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <QuickLinkCard
              icon={<Laptop size={15} color="#2c8a93" />}
              label="Asignar Equipos Portátiles"
            />
            <QuickLinkCard
              icon={<Smartphone size={15} color="#2c8a93" />}
              label="Registrar Dispositivo Móvil"
            />
            <QuickLinkCard
              icon={<Wrench size={15} color="#2c8a93" />}
              label="Gestionar Herramientas IT"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   COMPONENTES AUXILIARES MINI RE-DISEÑADOS
========================================= */
function InfoCard({ icon, title, description }) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "14px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#2c8a93";
        e.currentTarget.style.boxShadow =
          "0 10px 25px -5px rgba(44, 138, 147, 0.06)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#e2e8f0";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f0fdfa",
            padding: "8px",
            borderRadius: "8px",
          }}
        >
          {icon}
        </div>
        <h3
          style={{
            fontSize: "15px",
            fontWeight: 700,
            color: "#0f172a",
            margin: 0,
          }}
        >
          {title}
        </h3>
      </div>
      <p
        style={{
          fontSize: "13px",
          color: "#64748b",
          lineHeight: "1.5",
          margin: 0,
        }}
      >
        {description}
      </p>
    </div>
  );
}

function TableRow({ name, role, asset, date, status, statusColor, statusBg }) {
  return (
    <tr
      style={{
        borderBottom: "1px solid #e2e8f0",
        transition: "background 0.15s",
      }}
    >
      <td style={{ padding: "14px 16px" }}>
        <div style={{ fontWeight: 600, color: "#0f172a" }}>{name}</div>
        <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>
          {role}
        </div>
      </td>
      <td
        style={{
          padding: "14px 16px",
          color: "#475569",
          verticalAlign: "middle",
        }}
      >
        {asset}
      </td>
      <td
        style={{
          padding: "14px 16px",
          color: "#64748b",
          verticalAlign: "middle",
        }}
      >
        {date}
      </td>
      <td style={{ padding: "14px 16px", verticalAlign: "middle" }}>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: statusColor,
            backgroundColor: statusBg,
            padding: "4px 10px",
            borderRadius: "20px",
            letterSpacing: "0.01em",
          }}
        >
          {status}
        </span>
      </td>
    </tr>
  );
}

function QuickLinkCard({ icon, label }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px",
        background: "#f8fafc",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        cursor: "pointer",
        transition: "all 0.15s ease-in-out",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#ffffff";
        e.currentTarget.style.borderColor = "#2c8a93";
        e.currentTarget.style.boxShadow =
          "0 4px 16px -4px rgba(44, 138, 147, 0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#f8fafc";
        e.currentTarget.style.borderColor = "#e2e8f0";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        {icon}
        <span style={{ fontSize: "13.5px", fontWeight: 600, color: "#334155" }}>
          {label}
        </span>
      </div>
      <ArrowUpRight size={14} color="#94a3b8" />
    </div>
  );
}
