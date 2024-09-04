import "../assets/css/TaskCard.css";

export default function TaskCard(prop) {
  let data = prop.data;
  return (
    <>
      <div className="taskcard">
        <div className="taskid">
          <span>Task ID :</span> {data.taskid}
        </div>
        <div className="deadline">
          <span>Deadline :</span> {data.deadline}
        </div>
        <div className="workers">
          <div className="workers-data">
            {data.workers.map((a, i) => (
              <span key={i} className="worker-in-card">
                {a[0]}
              </span>
            ))}
          </div>
          <span className="worker-text">Working Workers</span>
        </div>
        <div className="sdata-box">
          <div className="expertise sdata">
            <span className="sdata-data">{data.expertise}</span>{" "}
            <span className="sdata-text">Expertise Level</span>
          </div>
          <div className="wage sdata">
            <span className="sdata-data">{data.wage}</span>{" "}
            <span className="sdata-text">Wage</span>
          </div>
        </div>
        <div className="progress-bar">
          <div className="progress-b"> </div>
          <div className="progress-f"> </div>
        </div>
      </div>
    </>
  );
}
