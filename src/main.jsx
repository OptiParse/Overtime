import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";

import App from "./App.jsx";
import CompletedTasks from "./pages/CompletedTasks.jsx";
import OngoingTasks from "./pages/OngoingTasks.jsx";
import UnassignedTasks from "./pages/UnassignedTasks.jsx";
import AllTasks from "./pages/CompletedTasks.jsx";
import Logout from "./pages/Logout.jsx";

import "./index.css";
import "./assets/css/App.css";
import {
  HiMiniChartBar,
  HiSquare3Stack3D,
  HiMiniArchiveBoxXMark,
  HiUserGroup
} from "react-icons/hi2";
import DataCard from "./components/DataCard";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Sidebar />
      <div className="main">
        <div className="data-cards">
          <DataCard title="completed tasks" data={67} icon={HiMiniChartBar} />
          <DataCard title="pending tasks" data={67} icon={HiSquare3Stack3D} />
          <DataCard
            title="unassigned tasks"
            data={67}
            icon={HiMiniArchiveBoxXMark}
          />
          <DataCard title="total workers" data={345} icon={HiUserGroup} />
        </div>

        <Routes>
          <Route path="/dashboard" element={<App />} />
          <Route path="/completedtasks" element={<CompletedTasks />} />
          <Route path="/ongoingtasks" element={<OngoingTasks />} />
          <Route path="/unassignedtasks" element={<UnassignedTasks />} />
          <Route path="/alltasks" element={<AllTasks />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </BrowserRouter>
  </StrictMode>
);
