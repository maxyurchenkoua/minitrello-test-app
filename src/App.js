import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <Dashboard />
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
