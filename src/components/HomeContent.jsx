import React from "react";
import { ArrowUpRight, Laptop, Smartphone, Wrench } from "lucide-react";

export default function HomeContent() {
  return (
    <div
      style={{
        padding: "40px",
        minHeight: "calc(100vh - 58px)",
        boxSizing: "border-box",
        fontFamily: "system-ui, -apple-system, sans-serif",
        // Aquí está el secreto del render: un degradado de fondo radial/lineal muy suave que da textura premium
        background:
          "linear-gradient(135deg, #fffcf7 0%, #f8fafc 40%, #f8fafc 100%)",
      }}
    >
      {/* BADGE SUPERIOR CON EL NARANJA DE TU LOGO */}
      <span
        style={{
          display: "inline-block",
          fontSize: "11px",
          fontWeight: 700,
          color: "#f27405", // Naranja del logo
          backgroundColor: "rgba(242, 116, 5, 0.08)", // Fondo sutil del mismo naranja
          padding: "4px 12px",
          borderRadius: "30px",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          marginBottom: "16px",
        }}
      >
        Portal de Cliente
      </span>

      {/* TÍTULO PRINCIPAL */}
      <h1
        style={{
          fontSize: "44px",
          fontWeight: 800,
          color: "#0f172a",
          margin: "0 0 16px 0",
          letterSpacing: "-0.03em",
        }}
      >
        Hola,
      </h1>

      {/* SUBTÍTULO */}
      <p
        style={{
          fontSize: "15px",
          color: "#475569",
          lineHeight: "1.6",
          margin: "0 0 40px 0",
          maxWidth: "600px",
        }}
      >
        Bienvenido a su centro de control logístico. Supervise sus embarques y
        operaciones en tiempo real.
      </p>

      {/* GRILLA DE TARJETAS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        <InfoCard
          title="Experiencia"
          description="10 años liderando el flete marítimo y operaciones en Perú."
          showBrandIcon
        />
        <InfoCard
          title="Misión"
          description="Optimización de rutas para envíos seguros y eficientes."
        />
        <InfoCard
          title="Visión"
          description="Ser el referente tecnológico en logística de Latinoamérica."
        />
        <InfoCard
          title="Compromiso"
          description="Transparencia total en cada etapa de su cadena."
        />
      </div>

      {/* CARD BLANCA GENERAL DE RESPIRO */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          padding: "32px",
          boxShadow: "0 10px 30px -15px rgba(15, 23, 42, 0.04)",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "40px",
          alignItems: "start",
        }}
      >
        {/* COLUMNA IZQUIERDA: TABLA */}
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
                fontSize: "18px",
                fontWeight: 700,
                color: "#0f172a",
                margin: 0,
              }}
            >
              Asignaciones Recientes
            </h2>
            <a
              href="#historial"
              style={{
                fontSize: "13px",
                fontWeight: 650,
                color: "#2c8a93",
                textDecoration: "none",
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f27405")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#2c8a93")}
            >
              Ver todo el historial
            </a>
          </div>

          <div
            style={{
              border: "1px solid #f1f5f9",
              borderRadius: "10px",
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
                    borderBottom: "1px solid #f1f5f9",
                  }}
                >
                  <th
                    style={{
                      padding: "14px 16px",
                      fontWeight: 600,
                      color: "#64748b",
                    }}
                  >
                    Colaborador
                  </th>
                  <th
                    style={{
                      padding: "14px 16px",
                      fontWeight: 600,
                      color: "#64748b",
                    }}
                  >
                    Activo
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
                  asset="MacBook Pro 14'"
                  date="24 May 2026"
                  status="Entregado"
                  statusColor="#22c55e"
                  statusBg="#f0fdf4"
                />
                <TableRow
                  name="Ana Sophia Loli"
                  asset="iPhone 15 Pro"
                  date="22 May 2026"
                  status="Entregado"
                  statusColor="#22c55e"
                  statusBg="#f0fdf4"
                />
                <TableRow
                  name="Marcos Rivas"
                  asset="Kit Herramientas Pro"
                  date="19 May 2026"
                  status="Pendiente"
                  statusColor="#f27405"
                  statusBg="#fff7ed"
                />
              </tbody>
            </table>
          </div>
        </div>

        {/* COLUMNA DERECHA: ACCESOS RÁPIDOS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#0f172a",
              margin: 0,
            }}
          >
            Accesos Rápidos
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <QuickLinkCard
              icon={<Laptop size={16} color="#2c8a93" />}
              label="Asignar nueva Laptop"
            />
            <QuickLinkCard
              icon={<Smartphone size={16} color="#2c8a93" />}
              label="Registrar Celular"
            />
            <QuickLinkCard
              icon={<Wrench size={16} color="#2c8a93" />}
              label="Inventario de Herramientas"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* COMPONENTES AUXILIARES */
function InfoCard({ title, description, showBrandIcon = false }) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "16px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        boxShadow: "0 2px 4px rgba(15, 23, 42, 0.01)",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow =
          "0 20px 25px -5px rgba(44, 138, 147, 0.05)";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.borderColor = "#2c8a93";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 4px rgba(15, 23, 42, 0.01)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "#e2e8f0";
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
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
        {showBrandIcon && (
          <span
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              background: "linear-gradient(135deg, #f27405 0%, #2c8a93 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ✕
          </span>
        )}
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

function TableRow({ name, asset, date, status, statusColor, statusBg }) {
  return (
    <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
      <td style={{ padding: "14px 16px", fontWeight: 600, color: "#0f172a" }}>
        {name}
      </td>
      <td style={{ padding: "14px 16px", color: "#475569" }}>{asset}</td>
      <td style={{ padding: "14px 16px", color: "#64748b" }}>{date}</td>
      <td style={{ padding: "14px 16px" }}>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: statusColor,
            backgroundColor: statusBg,
            padding: "4px 8px",
            borderRadius: "6px",
            textTransform: "uppercase",
            letterSpacing: "0.02em",
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
        padding: "14px 16px",
        background: "#f8fafc",
        border: "1px solid #f1f5f9",
        borderRadius: "10px",
        cursor: "pointer",
        transition: "all 0.15s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#ffffff";
        e.currentTarget.style.borderColor = "#2c8a93";
        e.currentTarget.style.boxShadow =
          "0 4px 12px -4px rgba(44, 138, 147, 0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#f8fafc";
        e.currentTarget.style.borderColor = "#f1f5f9";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {icon}
        <span style={{ fontSize: "13.5px", fontWeight: 550, color: "#334155" }}>
          {label}
        </span>
      </div>
      <ArrowUpRight size={14} color="#94a3b8" />
    </div>
  );
}
