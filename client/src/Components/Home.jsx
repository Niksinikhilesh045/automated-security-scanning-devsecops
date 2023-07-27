import { Button, Grid, Stack, Typography, styled } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#0063cc",
  borderColor: "#0063cc",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

export default function Home() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "space-evenly",
        paddingTop: "90px",
      }}
    >
      <div>
        <h1 style={{ fontSize: 55, paddingRight: 20 }}>
          <strong>
            Turning your expertise into <br />
            revenue just got a lot easier.
          </strong>
        </h1>
        <Typography variant="subtitle1" style={{ marginTop: "60px" }}>
          Create and sell online courses, build vibrant communities, and
          monetize memberships <br /> - all on a single scalable platform
          (Harshera)
        </Typography>
        <Stack spacing={2} direction="row" style={{ marginTop: 30 }}>
          <BootstrapButton
            variant="contained"
            disableRipple
            size="large"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Join For Free
          </BootstrapButton>
        </Stack>
      </div>
      <img
        src="https://www.verywellmind.com/thmb/DwWmNJsIYim0EGHvB_rW5Ps7DHU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/143071484-56a793c53df78cf772974e1e.jpg"
        alt="study"
        width={500}
        height={350}
        style={{ borderRadius: "20%" }}
      />
    </div>
  );
}
