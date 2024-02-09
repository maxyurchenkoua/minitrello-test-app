import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import BoardSectionList from './components/BoardSectionList';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content bg-slate-200">
          <BoardSectionList />
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




