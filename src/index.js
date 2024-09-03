import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import WorkerLayout from "layouts/Worker.js";
import AuthLayout from "layouts/Auth.js";
import Error404 from "layouts/404.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="/worker/*" element={<WorkerLayout />} />
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="/404" element={<Error404 />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  </BrowserRouter>
);
