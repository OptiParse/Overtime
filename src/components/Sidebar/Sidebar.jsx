import NavTab from "./NavTab";
import {
  HiSquares2X2,
  HiMiniChartBar,
  HiSquare3Stack3D,
  HiMiniArchiveBoxXMark,
  HiUserMinus
} from "react-icons/hi2";
import "../../assets/css/Sidebar.css"

export default function Sidebar(prop) {
  return (
    <div className="sidebar">
      <div className="header">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/d/d8/Overtime_%28sports_network%29_Logo.png"
          alt="Logo"
        />
        <span>Overtime</span>
      </div>

      <div className="tabs">
        <NavTab to="/dashboard" icon={HiSquares2X2} title="dashboard" />
        <NavTab
          to="/completedtasks"
          icon={HiMiniChartBar}
          title="completed tasks"
          badge={20}
        />
        <NavTab
          to="/ongoingtasks"
          icon={HiSquare3Stack3D}
          title="pending tasks"
          badge={30}
        />
        {!prop.isAdmin && 
        <NavTab
          to="/unassignedtasks"
          icon={HiMiniArchiveBoxXMark}
          title="unassigned tasks"
          badge={10}
        />}
        <NavTab
          to="/logout"
          icon={HiUserMinus}
          title="logout"
        />
      </div>
    </div>
  );
}
