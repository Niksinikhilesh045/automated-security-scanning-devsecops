import React from "react";
import Button from "@mui/material/Button";
import { Card, TextField, Typography } from "@mui/material";
export default function Signin() {
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
        <TextField label="Username" variant="outlined" fullWidth />
        <br /> <br />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
        />
        <br /> <br />
        <Button variant="contained" size="large">
          Sign In
        </Button>
      </Card>
    </div>
  );
}
