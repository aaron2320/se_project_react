import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App";
import "./components/Main/Main.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter
      basename="/se_project_react"
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <App />
    </BrowserRouter>
  </StrictMode>
);
// When going to GitHub instead of local data base Switch this to this.
// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { HashRouter as Router } from "react-router-dom";
// import "./index.css";
// import App from "./components/App/App.jsx";
// import "./components/Main/Main.css";
//
// createRoot(document.getElementById("root")).render(
//  <StrictMode>
//    <Router
//      basename="/se_project_react"
//      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
//>
//      <App />
//    </Router>
//  </StrictMode>
//);
