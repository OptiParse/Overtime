import TaskCard from "../components/TaskCard";
import "../assets/css/CompletedTasks.css";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header";

export default function CompletedTasks() {
  let data = {
    taskid: "67xsedvgsfnvlihi8",
    expertise: 7,
    wage: 78,
    workers: ["sdf", "df", "wrhu"],
    deadline: "23/45/2023",
  };
  return (
    <>
      <Sidebar />
      <div className="main">
        <Header />
        <h1>Ongoing Tasks : </h1>
        <div className="taskbox">
          <TaskCard data={data} />
          <TaskCard data={data} />
          <TaskCard data={data} />
          <TaskCard data={data} />
          <TaskCard data={data} />
          <TaskCard data={data} />
          <TaskCard data={data} />
          <TaskCard data={data} />
        </div>
      </div>
    </>
  );
}
