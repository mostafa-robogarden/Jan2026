const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const authMiddleware = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/login", asyncHandler(authController.login));

router.get("/me", authMiddleware, (req, res) => {
  res.json({
    ok: true,
    user: req.user,
  });
});

module.exports = router;