import { Button, Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Courses({ client }) {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    client
      .get(`/${localStorage.getItem("role")}/courses`, {
        headers: { authorization: "Beared " + localStorage.getItem("token") },
      })
      .then((response) => {
        setCourses(response.data.courses);
      });
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {courses.map((course) => (
        <div key={course._id}>
          <Course
            title={course.title}
            description={course.description}
            image={course.imageLink}
            courseId={course._id}
            price={course.price || "Free"}
            edit={localStorage.getItem("role") === "admin"}
            purchase={localStorage.getItem("role") === "users"}
          />
        </div>
      ))}
    </div>
  );
}

export function Course({
  title,
  description,
  image,
  courseId,
  price,
  edit,
  purchase,
}) {
  const navigate = useNavigate();
  function handleSelect(courseId) {
    navigate(`/course/${courseId}`);
  }
  return (
    <div style={{ margin: "30px" }}>
      <Card
        variant="outlined"
        style={{
          width: "300px",
          padding: 20,
          height: "300px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <img
          src={image}
          alt="course"
          style={{
            height: "150px",
            minWidth: "100%",
            objectFit: "cover",
          }}
        />
        <Typography variant="h5" textAlign="center">
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          style={{ overflow: "hidden", height: 50 }}
        >
          {description}
        </Typography>
        <Typography
          variant="subtitle3"
          style={{
            position: "absolute",
            bottom: "60px",
            color: "blue",
            background: "yellow",
          }}
        >
          <strong>{price != "Free" && "Price:- $"}</strong>
          {price}
        </Typography>
        {edit ? (
          <Button
            variant="contained"
            onClick={() => {
              handleSelect(courseId);
            }}
            style={{ position: "absolute", bottom: "15px" }}
          >
            EDIT
          </Button>
        ) : (
          <></>
        )}

        {purchase ? (
          <Button
            variant="contained"
            onClick={() => {
              handleSelect(courseId);
            }}
            style={{ position: "absolute", bottom: "15px" }}
          >
            ℹ Details
          </Button>
        ) : (
          <></>
        )}
      </Card>
    </div>
  );
}
