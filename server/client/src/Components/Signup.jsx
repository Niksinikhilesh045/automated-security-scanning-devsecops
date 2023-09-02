import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import {
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

export default function Signup({ client }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function handleChange(e) {
    localStorage.setItem("role", e.target.value);
    setRole(e.target.value);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ paddingTop: 100, marginBottom: 10 }}>
        <Typography variant="h6">
          Welcome to Harshera, signUp to proceed
        </Typography>
      </div>
      <Card variant="outlined" style={{ width: 500, padding: 20 }}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        />
        <br /> <br />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
          fullWidth
        />
        <br /> <br />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Who is this?</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={role}
            label="Who is this?"
            onChange={handleChange}
          >
            <MenuItem value={"admin"}>Admin</MenuItem>
            <MenuItem value={"users"}>User</MenuItem>
          </Select>
        </FormControl>
        <br />
        <br />
        <Button
          variant="contained"
          size="large"
          onClick={async () => {
            if (username == "" || password == "") return;
            const response = await client.post(`/${role}/signup`, {
              username,
              password,
            });
            const data = response.data;
            localStorage.setItem("token", data.token);
            setUser(username + Date.now());
            setPassword("");
            setUsername("");
            navigate("/");
          }}
        >
          Sign Up
        </Button>
      </Card>
    </div>
  );
}
