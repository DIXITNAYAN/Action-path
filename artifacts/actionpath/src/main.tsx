import { createRoot } from "react-dom/client";
import { setBaseUrl } from "@workspace/api-client-react";
import "./i18n";
import App from "./App";
import "./index.css";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;
if (apiBaseUrl && apiBaseUrl.trim().length > 0) {
  setBaseUrl(apiBaseUrl.trim());
}

createRoot(document.getElementById("root")!).render(<App />);
