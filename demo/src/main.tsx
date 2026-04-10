import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { fontFamily } from "@m1kapp/ui";
import App from "./App";
import "./index.css";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
