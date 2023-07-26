import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Course } from "./Courses";
import { Button, Card, TextField, Typography } from "@mui/material";

export default function UpdateCourse({ client }) {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [image, setImage] = useState(null);
  const [id, setId] = useState(null);

  const [course, setCourse] = useState(null);
  const { courseId } = useParams();
  useEffect(() => {
    client
      .get(`/admin/courses/${courseId}`, {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        setCourse(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setImage(response.data.imageLink);
        setId(response.data._id);
      });
  }, []);
  if (!course) return <div></div>;
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <Course
        image={image}
        title={title}
        description={description}
        edit={false}
      />
      <UpdateCourseFields
        client={client}
        image={image}
        setImage={setImage}
        description={description}
        setDescription={setDescription}
        title={title}
        setTitle={setTitle}
        id={id}
      />
    </div>
  );
}

function UpdateCourseFields({
  client,
  image,
  setImage,
  description,
  setDescription,
  title,
  setTitle,
  id,
}) {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ marginBottom: 10 }}>
        <Typography variant="h6">Now you can update this course</Typography>
      </div>
      <Card variant="outlined" style={{ width: 500, padding: 20 }}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br /> <br />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br /> <br />
        <TextField
          label="Image URL"
          variant="outlined"
          fullWidth
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <br /> <br />
        <Button
          variant="contained"
          size="large"
          onClick={async () => {
            const response = await client.put(
              `/admin/courses/${id}`,
              {
                title,
                description,
                imageLink: image,
                published: true,
              },
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            );
            navigate("/courses");
          }}
        >
          Update Course
        </Button>
        <Button
          variant="contained"
          size="large"
          style={{ marginLeft: 20 }}
          onClick={async () => {
            await client.delete(`/admin/courses/${id}`, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            });
            navigate("/courses");
          }}
        >
          🚮
        </Button>
      </Card>
    </div>
  );
}
