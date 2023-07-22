import { Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Appbar() {
  const navigate = useNavigate();
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
