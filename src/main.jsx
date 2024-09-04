import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Hero from "./pages/Hero.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import CompletedTasks from "./pages/CompletedTasks.jsx";
import OngoingTasks from "./pages/OngoingTasks.jsx";
import UnassignedTasks from "./pages/UnassignedTasks.jsx";
import AllTasks from "./pages/CompletedTasks.jsx";
import Logout from "./pages/Logout.jsx";
import Register from "./pages/Register.jsx";

import "./index.css";
import "./assets/css/App.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/completedtasks" element={<CompletedTasks />} />
          <Route path="/ongoingtasks" element={<OngoingTasks />} />
          <Route path="/unassignedtasks" element={<UnassignedTasks />} />
          <Route path="/alltasks" element={<AllTasks />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </BrowserRouter>
  </StrictMode>
);
