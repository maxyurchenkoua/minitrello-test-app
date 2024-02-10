import { useQuery } from "@apollo/client";
import Header from "./components/UI/Header";
import Sidebar from "./components/UI/Sidebar";
import Boards from "./components/Boards/Boards";
import { GET_TASKS } from './utils/queries'
import { BiPlus } from "react-icons/bi";
import AddTask from "./components/Tasks/AddTask";

function App() {
  const { loading, error, data, refetch } = useQuery(GET_TASKS);

  const updateTasks = () => {
    refetch()
  };

  const handleTaskClick = () => {
    document.getElementById("add-task").showModal();
  };

  if (loading) return (
    <div className="mx-auto mt-48 text-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  )
  if (error) return <p>Error</p>;
  return (
    <div className="App">
      <Header />
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content bg-slate-200">
          {/* {JSON.stringify(data.boards)} */}
          {/* <BoardSectionList boards={data.boards.tasks} /> */}

          <div className="px-12 pt-12 mr-6 md:mr-0 align-middle">
            <button
              className="btn btn-sm btn-primary"
              onClick={() => handleTaskClick()}
            >
              <BiPlus size={22} />
              Add task
            </button>
          </div>
          <Boards tasks={data.tasks} updateTasks={updateTasks} />
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <Sidebar />
        </div>
      </div>
      <AddTask updateTasks={updateTasks} />
    </div>
  );
}

export default App;




