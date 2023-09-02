const express = require("express");
const { userAuthenticateJWT } = require("../MiddleWares/userAuth");
const { User, Course } = require("../Database/index");
const router = express.Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// User routes

router.get("/me", userAuthenticateJWT, (req, res) => {
  res.json({ username: req.user.username });
});

router.post("/signup", async (req, res) => {
  // logic to sign up user
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    return res.status(403).json({ message: "User already exist." });
  }
  const newUser = new User({ username, password });
  await newUser.save();
  const token = jwt.sign({ username, role: "user" }, process.env.DB_KEY, {
    expiresIn: "1h",
  });
  res.json({ message: "User created successfully", token });
});

router.post("/login", async (req, res) => {
  // logic to log in user
  const { username, password } = req.headers;
  if (!(await User.findOne({ username, password }))) {
    return res.sendStatus(403);
  }
  const token = jwt.sign({ username, role: "user" }, process.env.DB_KEY, {
    expiresIn: "1h",
  });
  res.json({ message: "Logged in successfully", token });
});

router.get("/courses", userAuthenticateJWT, async (req, res) => {
  // logic to list all courses
  const courses = await Course.find({ published: true });
  res.json({ courses });
});

router.post("/courses/:courseId", userAuthenticateJWT, async (req, res) => {
  // logic to purchase a course
  const id = req.params.courseId;
  const { username } = req.user;
  const user = await User.findOne({ username });
  const course = await Course.findById(id);

  if (!user) {
    return res.status(403).json({ message: "User doesn't exist." });
  } else if (!course) {
    return res.status(404).json({ message: "Course not fouond" });
  }

  user.purchasedCourses.push(course);
  await user.save();
  res.json({ message: "Course purchased successfully" });
});

router.get("/purchasedCourses", userAuthenticateJWT, async (req, res) => {
  // logic to view purchased courses
  const { username } = req.user;
  const user = await User.findOne({ username }).populate("purchasedCourses");
  if (user) {
    return res.json({ purchasedCourses: user.purchasedCourses || [] });
  }
  res.status(403).json({ message: "User not found" });
});

router.get("/courses/:courseId", userAuthenticateJWT, async (req, res) => {
  const id = req.params.courseId;
  const course = await Course.findOne({ _id: new mongoose.Types.ObjectId(id) });
  res.json(course);
});

module.exports = router;
