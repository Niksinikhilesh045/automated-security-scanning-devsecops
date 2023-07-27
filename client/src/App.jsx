import { createContext, useState } from "react";
import "./App.css";
import Signup from "./Components/Signup";
import Appbar from "./Components/Appbar";
import Signin from "./Components/Signin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import AddCourse from "./Components/AddCourse";
import Courses from "./Components/Courses";
import UpdateCourse from "./Components/UpdateCourse";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import PurchaseCourses from "./Components/PurchaseCourses";
import Home from "./Components/Home";
const client = axios.create({ baseURL: "http://localhost:3000" });

export const UserContext = createContext(null);

function App() {
  // const [count, setCount] = useState(0);
  const [user, setUser] = useState(undefined);

  return (
    <>
      <div className="container">
        <UserContext.Provider value={{ setUser, user }}>
          <RecoilRoot>
            <Router>
              <Appbar client={client} />
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route
                  path="/addcourse"
                  element={<AddCourse client={client} />}
                ></Route>
                <Route
                  path="/course/:courseId"
                  element={<UpdateCourse client={client} />}
                ></Route>
                <Route
                  path="/login"
                  element={<Signin client={client} />}
                ></Route>
                <Route
                  path="/signup"
                  element={<Signup client={client} />}
                ></Route>
                <Route
                  path="/courses"
                  element={<Courses client={client} />}
                ></Route>
                <Route
                  path="/purchased"
                  element={<PurchaseCourses client={client} />}
                ></Route>
              </Routes>
            </Router>
          </RecoilRoot>
        </UserContext.Provider>
      </div>
    </>
  );
}

export default App;
