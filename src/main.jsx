import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#0f172a",
            color: "#fff",
            padding: "12px 14px",
            borderRadius: "10px",
            fontSize: "13px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
          },

          success: {
            style: {
              background: "#16a34a",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#16a34a",
            },
          },

          error: {
            style: {
              background: "#dc2626",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#dc2626",
            },
          },
        }}
      />{" "}
      <App />
    </BrowserRouter>
  </StrictMode>,
);
