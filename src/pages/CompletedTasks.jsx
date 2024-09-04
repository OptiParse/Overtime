import TaskCard from "../components/TaskCard";
import "../assets/css/CompletedTasks.css"

export default function CompletedTasks() {
  let data = {
    taskid: "67xsedvgsfnvlihi8",
    expertise: 7,
    wage: 78,
    workers: ["sdf", "df", "wrhu"],
    deadline: "23/45/2023"
  };
  return (
    <>
      <h1>Completed Tasks : </h1>
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
    </>
  );
}
