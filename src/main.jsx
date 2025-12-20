import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";
import "./index.css";
import AuthProvider from "./providers/AuthProvider.jsx";
import QueryProvider from "./providers/QueryProvider.jsx";
import router from "./routes/router.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryProvider>
        <RouterProvider router={router} />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              marginTop: "70px",
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              borderRadius: "12px",
              border: "1.5px solid var(--color-primary)",
            },
            success: {
              iconTheme: {
                primary: "var(--color-success)",
                secondary: "white",
              },
            },
            error: {
              iconTheme: {
                primary: "var(--color-error)",
                secondary: "white",
              },
            },
          }}
        />
      </QueryProvider>
    </AuthProvider>
  </StrictMode>
);
