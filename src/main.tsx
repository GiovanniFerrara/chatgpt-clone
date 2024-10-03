// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import AppProviders from "./app-providers";
import App from "./app/app";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);
