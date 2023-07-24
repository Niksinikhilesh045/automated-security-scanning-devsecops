import { createContext, useState } from "react";
import "./App.css";
import Signup from "./Components/Signup";
import Appbar from "./Components/Appbar";
import Signin from "./Components/Signin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import AddCourse from "./Components/AddCourse";
const client = axios.create({ baseURL: "http://localhost:3000" });

export const UserContext = createContext(null);

function App() {
  // const [count, setCount] = useState(0);
  const [user, setUser] = useState(undefined);

  return (
    <>
      <div className="container">
        <UserContext.Provider value={{ setUser, user }}>
          <Router>
            <Appbar client={client} />
            <Routes>
              <Route
                path="/addcourse"
                element={<AddCourse client={client} />}
              ></Route>
              <Route path="/login" element={<Signin client={client} />}></Route>
              <Route
                path="/signup"
                element={<Signup client={client} />}
              ></Route>
            </Routes>
          </Router>
        </UserContext.Provider>
      </div>
    </>
  );
}

export default App;
