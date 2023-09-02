import { Button, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../App";

export default function Appbar({ client }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const { setUser, user } = useContext(UserContext);

  useEffect(() => {
    client
      .get(`/${localStorage.getItem("role")}/me`, {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        setUsername(response.data.username);
      });
  }, [user]);

  if (username) {
    return (
      <div className="navbar">
        <div className="navbar-logo">
          <Typography
            variant="h5"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            Harshera
          </Typography>
        </div>
        <div className="navbar-options">
          <div style={{ marginRight: 20, display: "inline" }}>
            Hello <strong>{username}!</strong>
          </div>

          {localStorage.getItem("role") === "admin" && (
            <Link
              to="/addcourse"
              style={{
                textDecoration: "none",
                color: "blue",
                marginRight: "23px",
                fontSize: "20px",
              }}
            >
              Add Courses
            </Link>
          )}

          {localStorage.getItem("role") === "users" && (
            <Link
              to="/purchased"
              style={{
                textDecoration: "none",
                color: "blue",
                marginRight: "23px",
                fontSize: "20px",
              }}
            >
              Purchased Courses
            </Link>
          )}

          <Link
            to="/courses"
            style={{
              textDecoration: "none",
              color: "blue",
              marginRight: "23px",
              fontSize: "20px",
            }}
          >
            Courses
          </Link>

          <Button
            variant="contained"
            onClick={() => {
              localStorage.setItem("token", null);
              setUsername(null);
              setUser(null);
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <Typography
          variant="h5"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          Harshera
        </Typography>
      </div>
      <div className="navbar-options">
        <Button
          variant="contained"
          style={{ marginRight: 10 }}
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign Up
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/login");
          }}
        >
          Sign in
        </Button>
      </div>
    </div>
  );
}
