const express = require("express");
const {
  createStudent,
  getAllStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

const router = express.Router();

// Create Route
router.post("/create", createStudent);

// Get All Students
router.get("/getAll", getAllStudent);

// Update Student
router.put("/update/:id", updateStudent);

// Delete Student
router.delete("/delete/:id", deleteStudent);

module.exports = router;
