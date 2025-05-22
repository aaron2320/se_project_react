import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App/App";
import "./index.css";

// Suppress React Router future flag warnings
const originalWarn = console.warn;
console.warn = (...args) => {
  if (args[0]?.includes("React Router Future Flag Warning")) {
    return; // Skip React Router warnings
  }
  originalWarn(...args);
};

// Force basename to /se_project_react/ for both dev and prod to match server
const basename = "/se_project_react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
