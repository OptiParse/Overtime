import {
  HiMiniChartBar,
  HiSquare3Stack3D,
  HiMiniArchiveBoxXMark,
  HiUserGroup
} from "react-icons/hi2";
import DataCard from "../components/DataCard";

export default function Header(prop) {
  return (
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
  )
}