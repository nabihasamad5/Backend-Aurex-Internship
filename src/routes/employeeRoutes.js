const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

// Middleware: har :id wale route se pehle ID ka format check karta hai
router.param("id", (req, res, next, id) => {
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid employee id" });
  }
  next();
});

router.route("/").get(getEmployees).post(createEmployee);
router.route("/:id").get(getEmployeeById).put(updateEmployee).delete(deleteEmployee);

module.exports = router;