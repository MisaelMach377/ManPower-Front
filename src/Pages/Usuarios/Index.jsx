import React, { useEffect, useState } from "react";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const response = await fetch("https://localhost:44382/api/UsuariosApi", {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      setUsuarios(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      style={{
        padding: "25px",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#1e293b",
            fontSize: "32px",
            fontWeight: "700",
          }}
        >
          Usuarios
        </h2>

        <button
          style={{
            border: "none",
            background: "#2563eb",
            color: "white",
            padding: "12px 20px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "14px",
          }}
        >
          Nuevo Usuario
        </button>
      </div>

      {/* TABLA */}
      <div
        style={{
          background: "white",
          borderRadius: "14px",
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead
            style={{
              background: "#f1f5f9",
            }}
          >
            <tr>
              <th style={thStyle}>Código</th>
              <th style={thStyle}>Nombre</th>
              <th style={thStyle}>Apellido</th>
              <th style={thStyle}>Tipo Doc.</th>
              <th style={thStyle}>N° Documento</th>
              <th style={thStyle}>Correo</th>
              <th style={thStyle}>Celular</th>
              <th style={thStyle}>Activo</th>
              <th style={thStyle}>Fecha Creación</th>
              <th style={thStyle}>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.map((usuario) => (
              <tr
                key={usuario.id}
                style={{
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <td style={tdStyle}>{usuario.codigo}</td>

                <td style={tdStyle}>{usuario.nombre}</td>

                <td style={tdStyle}>{usuario.apellido}</td>

                <td style={tdStyle}>{usuario.tipoDocumento}</td>

                <td style={tdStyle}>{usuario.numeroDocumento}</td>

                <td style={tdStyle}>{usuario.correo}</td>

                <td style={tdStyle}>{usuario.celular || "-"}</td>

                <td style={tdStyle}>
                  <span
                    style={{
                      background: usuario.activo ? "#dcfce7" : "#fee2e2",
                      color: usuario.activo ? "#166534" : "#991b1b",
                      padding: "6px 12px",
                      borderRadius: "999px",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    {usuario.activo ? "Activo" : "Inactivo"}
                  </span>
                </td>

                <td style={tdStyle}>
                  {new Date(usuario.fechaCreacion).toLocaleDateString()}
                </td>

                <td style={tdStyle}>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <button style={editButton}>Editar</button>

                    <button style={deleteButton}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "16px",
  color: "#334155",
  fontSize: "14px",
  fontWeight: "700",
};

const tdStyle = {
  padding: "16px",
  color: "#475569",
  fontSize: "14px",
};

const editButton = {
  border: "none",
  background: "#dbeafe",
  color: "#1d4ed8",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

const deleteButton = {
  border: "none",
  background: "#fee2e2",
  color: "#b91c1c",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};
