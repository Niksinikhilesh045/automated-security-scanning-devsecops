const express = require("express");
const app = express();
const cors = require("cors");
const { config } = require("dotenv");
const userRouter = require("./Routes/users");
const adminRouter = require("./Routes/admin");
const mongoose = require("mongoose");
config();

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("MongoDB connection started");
    app.listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
  })
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("Hello World from Nikhilesh's PC! I love you Nivvu!");
})
