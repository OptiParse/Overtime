import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header";
import AddTask from "../components/AddTask";

function App() {
  return (
    <>
      <Sidebar />
      <div className="main">
        <Header />
        <AddTask />
      </div>
    </>
  );
}

export default App;
