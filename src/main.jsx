import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";

// import AdminDashboard from "./pages/AdminDashboard.jsx";
// import CompletedTasks from "./pages/CompletedTasks.jsx";
// import OngoingTasks from "./pages/OngoingTasks.jsx";
// import UnassignedTasks from "./pages/UnassignedTasks.jsx";
// import AllTasks from "./pages/CompletedTasks.jsx";
// import Logout from "./pages/Logout.jsx";
// import Register from "./pages/Register.jsx";

import "./index.css";
import "./assets/css/App.css";

const LazyAdminDashboard = lazy(() => import("./pages/AdminDashboard.jsx"));
const LazyCompletedTasks = lazy(() => import("./pages/CompletedTasks.jsx"));
const LazyOngoingTasks = lazy(() => import("./pages/OngoingTasks.jsx"));
const LazyUnassignedTasks = lazy(() => import("./pages/UnassignedTasks.jsx"));
const LazyAllTasks = lazy(() => import("./pages/CompletedTasks.jsx"));
const LazyLogout = lazy(() => import("./pages/Logout.jsx"));
const LazyRegister = lazy(() => import("./pages/Register.jsx"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/dashboard" element={<LazyAdminDashboard />} />
          <Route path="/completedtasks" element={<LazyCompletedTasks />} />
          <Route path="/ongoingtasks" element={<LazyOngoingTasks />} />
          <Route path="/unassignedtasks" element={<LazyUnassignedTasks />} />
          <Route path="/alltasks" element={<LazyAllTasks />} />
          <Route path="/logout" element={<LazyLogout />} />
          <Route path="/register" element={<LazyRegister />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
