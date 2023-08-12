import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Course } from "./Courses";
import { Button, Card, Grid, TextField, Typography } from "@mui/material";

export default function UpdateCourse({ client }) {
  const { courseId } = useParams();
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [image, setImage] = useState(null);
  const [id, setId] = useState(null);
  const [price, setPrice] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const [course, setCourse] = useState(null);
  useEffect(() => {
    client
      .get(`/${localStorage.getItem("role")}/courses/${courseId}`, {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        setCourse(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setImage(response.data.imageLink);
        setId(response.data._id);
        setPrice(response.data.price);
      });
  }, []);

  client
    .get("/users/purchasedCourses", {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((response) => {
      const data = response.data.purchasedCourses;
      const purchased = data.find((eachCourse) => eachCourse._id === id);
      if (purchased) setDisabled(true);
    });

  if (!course) return <div></div>;
  if (localStorage.getItem("role") === "users") {
    return (
      <>
        <div style={{ position: "relative" }}>
          <div
            style={{
              background: "black",
              color: "white",
              width: "100%",
              height: "120px",
              textAlign: "center",
            }}
          >
            <h1 style={{ paddingTop: 40 }}>{title}</h1>
          </div>
        </div>

        <div style={{ position: "absolute" }}>
          <Grid container>
            <Grid item lg={8} md={12} sm={12}>
              <Course
                image={image}
                title={title}
                description={description}
                edit={false}
                purchase={false}
                price={price}
              ></Course>
            </Grid>
            <Grid
              item
              lg={4}
              md={12}
              sm={12}
              style={{ paddingRight: "50px", paddingTop: "20px" }}
            >
              <h1>Certificate:</h1>
              <br />
              <img
                src="https://udemy-certificate.s3.amazonaws.com/image/UC-bbb1e2d3-634b-40aa-8aec-b15466c0b084.jpg?v=1689755353000"
                alt="cretificate"
                style={{ width: "100%" }}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            size="large"
            style={{ marginLeft: 40, marginBottom: 70 }}
            onClick={(e) => {
              client.post(
                `/users/courses/${id}`,
                {},
                {
                  headers: {
                    authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );
              window.alert("Course Purchased");
              setDisabled(true);
            }}
            disabled={disabled}
          >
            {disabled ? "Purchased" : "Purchase"}
          </Button>
        </div>
      </>
    );
  }
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <Course
        image={image}
        title={title}
        description={description}
        edit={false}
        price={price}
      />
      <UpdateCourseFields
        client={client}
        image={image}
        setImage={setImage}
        description={description}
        setDescription={setDescription}
        title={title}
        setTitle={setTitle}
        price={price}
        setPrice={setPrice}
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
  price,
  setPrice,
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
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          value={price}
          onChange={(e) => setPrice(e.target.value)}
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
                price,
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
