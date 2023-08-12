const express = require("express");
const app = express();
const cors = require("cors");
const { config } = require("dotenv");
const userRouter = require("./Routes/users");
const adminRouter = require("./Routes/admin");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://harsh:harsh2025@cluster0.lrwi214.mongodb.net/courses",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((result) => {
    console.log("MongoDB connection started");
    app.listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
  })
  .catch((err) => console.log(err));

config();
app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/admin", adminRouter);
