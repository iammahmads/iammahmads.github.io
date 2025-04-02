import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-tooltip/dist/react-tooltip.css"; // tooltip css
import { RouterProvider } from "react-router";
import router from "./routes.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
