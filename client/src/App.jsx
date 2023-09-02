import { createContext, useEffect, useState } from "react";
import "./App.css";
import Signup from "./Components/Signup";
import Appbar from "./Components/Appbar";
import Signin from "./Components/Signin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import AddCourse from "./Components/AddCourse";
import Courses from "./Components/Courses";
import UpdateCourse from "./Components/UpdateCourse";
import PurchaseCourses from "./Components/PurchaseCourses";
import Home from "./Components/Home";
import { userState } from "./store/atoms/user";
import { useSetRecoilState } from "recoil";
import Loading from "./Components/Loading";
const client = axios.create({ baseURL: "http://localhost:3000" });

export const UserContext = createContext(null);

function App() {
  // const [count, setCount] = useState(0);
  const setUser = useSetRecoilState(userState);

  const init = async () => {
    try {
      const response = await client.get(`/${localStorage.getItem("role")}/me`, {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
      });

      // await new Promise((resolve) => {
      //   console.log("start");
      //   setTimeout(resolve, 1000);
      //   console.log("end");
      // });

      if (response.data.username)
        setUser({ isLoading: false, username: response.data.username });
      else setUser({ isLoading: true, username: null });
    } catch (err) {
      setUser({
        isLoading: false,
        userEmail: null,
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <div className="container">
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
            <Route path="/login" element={<Signin client={client} />}></Route>
            <Route path="/signup" element={<Signup client={client} />}></Route>
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
      </div>
    </>
  );
}

export default App;
