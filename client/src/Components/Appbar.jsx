import { Button, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export default function Appbar({ client }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const { setUser, user } = useContext(UserContext);

  useEffect(() => {
    client
      .get("/admin/me", {
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
          <Typography variant="h5">Harshera</Typography>
        </div>
        <div className="navbar-options">
          <div style={{ marginRight: 10, display: "inline" }}>
            Hello <strong>{username}!</strong>
          </div>
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
        <Typography variant="h5">Harshera</Typography>
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
