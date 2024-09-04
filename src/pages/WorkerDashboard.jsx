import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header";

function App() {
  return (
    <>
      <Sidebar isAdmin={false} />
      <div className="main">
        <Header />
      </div>
    </>
  );
}

export default App;
