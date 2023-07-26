import { Button, Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Courses({ client }) {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    client
      .get("/admin/courses", {
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
            edit={true}
          />
        </div>
      ))}
    </div>
  );
}

export function Course({ title, description, image, courseId, edit }) {
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
          minHeight: "200px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src={image}
          alt="course"
          style={{
            height: "150px",
            minWidth: "85%",
            objectFit: "cover",
          }}
        />
        <Typography variant="h5" textAlign="center">
          {title}
        </Typography>
        <Typography variant="subtitle1">{description}</Typography>
        {edit ? (
          <Button
            variant="contained"
            onClick={() => {
              handleSelect(courseId);
            }}
          >
            EDIT
          </Button>
        ) : (
          <></>
        )}
      </Card>
    </div>
  );
}
