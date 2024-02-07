import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center bg-gray-50">
          <Dashboard />
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default App;




