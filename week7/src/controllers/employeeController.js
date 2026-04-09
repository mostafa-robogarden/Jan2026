const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.getAllEmployees = async (req, res) => {
  const users = await User.findAll({
    attributes: ["username", "role", "created_on"], // don't return passwordhash
  });
  res.json(users);
};

exports.getEmployeeByUsername = async (req, res) => {
  const { username } = req.params;

  const user = await User.findByPk(username, {
    attributes: ["username", "role", "created_on"],
  });

  if (!user) {
    const err = new Error("User not found");
    err.statusCode = 404;
    throw err;
  }

  res.json(user);
};

exports.createEmployee = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    const err = new Error("username, password, role are required");
    err.statusCode = 400;
    throw err;
  }

  const existing = await User.findByPk(username);
  if (existing) {
    const err = new Error("Username already exists");
    err.statusCode = 409;
    throw err;
  }

  const passwordhash = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    passwordhash,
    role,
    created_on: new Date(),
  });

  res.status(201).json({
    username: newUser.username,
    role: newUser.role,
    created_on: newUser.created_on,
  });
};

exports.updateEmployee = async (req, res) => {
  const { username } = req.params;
  const { password, role } = req.body;

  const user = await User.findByPk(username);
  if (!user) {
    const err = new Error("User not found");
    err.statusCode = 404;
    throw err;
  }

  // Update role if provided
  if (role !== undefined) user.role = role;

  // If password is provided, hash it
  if (password !== undefined) {
    user.passwordhash = await bcrypt.hash(password, 10);
  }

  await user.save();

  res.json({ message: "Updated", username: user.username, role: user.role });
};

exports.deleteEmployee = async (req, res) => {
  const { username } = req.params;

  const user = await User.findByPk(username);
  if (!user) {
    const err = new Error("User not found");
    err.statusCode = 404;
    throw err;
  }

  await user.destroy();
  res.json({ message: "Deleted", username });
};