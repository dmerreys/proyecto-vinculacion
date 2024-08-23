import Projects from "./pages/Projects";
import CreateProyectoForm from "./pages/CreateProject";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Principal from "./pages/Principal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<PrivateRoute />}>
          <Route path="/main" element={<Principal />} />
        </Route>
        <Route path="/proyectos" element={<PrivateRoute />}>
          <Route path="/proyectos" element={<Projects />} />
        </Route>
        <Route path="/cproyecto" element={<PrivateRoute />}>
          <Route path="/cproyecto" element={<CreateProyectoForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
