const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const authMiddleware = require("../middleware/authMiddleware");
const requireRole = require("../middleware/requireRole");
const employeeController = require("../controllers/employeeController");

const router = express.Router();

// everyone logged in can read
router.get("/", authMiddleware, asyncHandler(employeeController.getAllEmployees));
router.get("/:username", authMiddleware, asyncHandler(employeeController.getEmployeeByUsername));

// only admin can create/update/delete
router.post("/", authMiddleware, requireRole("admin"), asyncHandler(employeeController.createEmployee));
router.put("/:username", authMiddleware, requireRole("admin"), asyncHandler(employeeController.updateEmployee));
router.delete("/:username", authMiddleware, requireRole("admin"), asyncHandler(employeeController.deleteEmployee));

module.exports = router;