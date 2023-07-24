import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import { Card, TextField, Typography } from "@mui/material";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Signin({ client }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const login = async () => {
    if (username == "" || password == "") return;

    const response = await client.post(
      "/admin/login",
      {},
      { headers: { username, password } }
    );
    const data = response.data;
    localStorage.setItem("token", data.token);
    setUser(username);
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ paddingTop: 150, marginBottom: 10 }}>
        <Typography variant="h6">Welcome Back, Sign In below..</Typography>
      </div>
      <Card variant="outlined" style={{ width: 500, padding: 20 }}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br /> <br />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
        />
        <br /> <br />
        <Button variant="contained" size="large" onClick={login}>
          Sign In
        </Button>
      </Card>
    </div>
  );
}
