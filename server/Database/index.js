const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

// Defining mongoose Schema
const userSchema = Schema({
  username: String,
  password: String,
  purchasedCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
});

const adminSchema = Schema({
  username: String,
  password: String,
});

const courseSchema = Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

// Defining mongoose models
const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);

module.exports = { User, Admin, Course };
