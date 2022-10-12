import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TasksList from "./components/TasksList";

function App() {
  return (
    <Router>
    <div>
      <div>
        <div>
          <Routes>
            <Route exact path="/" element={<TasksList/>}>
            </Route>
          </Routes>
        </div>
      </div>
    </div>
    </Router>
  );
}

export default App;
