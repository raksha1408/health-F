import { render } from "react-dom";

import { createRoot } from 'react-dom/client';
import App from "./App";
import "./css/main.css";
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  throw new Error("Root element not found");
}