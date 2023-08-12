const express = require("express");
const { adminAuthenticateJWT } = require("../MiddleWares/adminAuth");
const { Course, Admin } = require("../Database/index");
const router = express.Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

router.get("/me", adminAuthenticateJWT, (req, res) => {
  res.json({ username: req.admin.username });
});

// Admin routes
router.post("/signup", async (req, res) => {
  // logic to sign up admin
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (admin) {
    res.status(403).json({ message: "Admin already exist." });
  } else {
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    const token = jwt.sign({ username, role: "admin" }, process.env.DB_KEY, {
      expiresIn: "1h",
    });
    res.json({ message: "Admin created successfully", token });
  }
});

router.post("/login", async (req, res) => {
  // logic to log in admin
  const admin = req.headers;
  if (
    await Admin.findOne({ username: admin.username, password: admin.password })
  ) {
    const token = jwt.sign(
      { username: admin.username, role: "admin" },
      process.env.DB_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

router.post("/courses", adminAuthenticateJWT, async (req, res) => {
  // logic to create a course
  const course = req.body;
  const newCourse = new Course(course);
  await newCourse.save();
  res.json({ message: "Course created successfully", courseId: newCourse.id });
});

router.put("/courses/:courseId", adminAuthenticateJWT, async (req, res) => {
  // logic to edit a course
  try {
    const id = req.params.courseId;
    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (updatedCourse) {
      return res.json({ message: "Course updated successfully" });
    } else {
      return res.status(404).json({ message: "Course not found" });
    }
  } catch (err) {
    res.json({ error: err });
  }
});

router.get("/courses", adminAuthenticateJWT, async (req, res) => {
  // logic to get all courses
  const courses = await Course.find();
  res.json({ courses });
});

router.get("/courses/:courseId", adminAuthenticateJWT, async (req, res) => {
  const id = req.params.courseId;
  const course = await Course.findOne({
    _id: new mongoose.Types.ObjectId(id),
  });
  res.json(course);
});

router.delete("/courses/:courseId", adminAuthenticateJWT, async (req, res) => {
  const id = req.params.courseId;
  await Course.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
  res.json({ mssg: "Deleted successfully!" });
});

module.exports = router;
