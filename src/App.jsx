import { useState } from "react";
import "./App.css";
import Signup from "./Components/signup";
import Appbar from "./Components/Appbar";
import Signin from "./Components/Signin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import AddCourse from "./Components/AddCourse";
const client = axios.create({ baseURL: "http://localhost:3000" });

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="container">
        <Router>
          <Appbar />
          <Routes>
            <Route
              path="/addcourse"
              element={<AddCourse client={client} />}
            ></Route>
            <Route path="/login" element={<Signin client={client} />}></Route>
            <Route path="/signup" element={<Signup client={client} />}></Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
