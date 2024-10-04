// src/main.jsx
import ReactDOM from "react-dom/client";
import AppProviders from "./app-providers";
import App from "./app/app";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppProviders>
    <App />
  </AppProviders>
);
