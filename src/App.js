import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TasksList from "./components/TasksList/TasksList";
import AddEditTask from "./components/AddEditTask/AddEditTask";

function App() {
  return (
    <Router>
    <div>
      <div>
        <div>
          <Routes>
            <Route exact path="/" element={<TasksList/>}>
            </Route>
            <Route exact path="/add" element={<AddEditTask/>}>
            </Route>
            <Route exact path="/edit/:id" element={<AddEditTask isEdit={ true }/>}>
            </Route>
          </Routes>
        </div>
      </div>
    </div>
    </Router>
  );
}

export default App;
