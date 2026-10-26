const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    email: { type: String, required: [true, "Email is required"], unique: true, lowercase: true },
    department: { type: String, required: [true, "Department is required"] },
    role: { type: String, required: [true, "Role is required"] },
    performanceScore: { type: Number, min: 0, max: 100, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);