import { useQuery, gql } from "@apollo/client";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import BoardSectionList from "./components/BoardSectionList";


// const GET_BOARDS = gql`
//   query GetBoards {
//     boards {
//       id
//       name
//       position
//       tasks {
//         id
//         title
//         description
//       }
//     }
//   }
// `;

const QUERY = gql`
  {
    tasks {
      id
      title
      description
      taskStatus
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(QUERY);

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

          <BoardSectionList tasks={data.tasks} />
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




