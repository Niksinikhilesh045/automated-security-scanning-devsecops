import { Button, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import Loading from "./Loading";

export default function Appbar({ client }) {
  const user = useRecoilValue(userState);
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  useEffect(() => {
    client
      .get(`/${localStorage.getItem("role")}/me`, {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        setUser({ isLoading: false, username: response.data.username });
      });
  }, [user.username]);

  if (user.isLoading) return <Loading />;

  if (user.username) {
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
            Hello <strong>{user.username}!</strong>
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
              localStorage.setItem("role", null);
              setUser({ username: null, isLoading: false });
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
