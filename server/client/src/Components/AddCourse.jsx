import { Button, Card, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

export default function AddCourse({ client }) {
  if (localStorage.getItem("role") === "users") return <div></div>;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(null);

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
        <Typography variant="h6">Write details about course to add.</Typography>
      </div>
      <Card variant="outlined" style={{ width: 500, padding: 20 }}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br /> <br />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
            const response = await client.post(
              "/admin/courses",
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

            setDescription("");
            setTitle("");
            setImage("");
          }}
        >
          Add Course
        </Button>
      </Card>
    </div>
  );
}
