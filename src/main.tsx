import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootEl = document.getElementById("root");

if (!rootEl) {
  throw new Error("Root element missing");
}

if (rootEl.childElementCount > 0) {
  hydrateRoot(rootEl, <App />);
} else {
  createRoot(rootEl).render(<App />);
}
