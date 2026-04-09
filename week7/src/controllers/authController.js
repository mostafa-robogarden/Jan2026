const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    const err = new Error("username and password are required");
    err.statusCode = 400;
    throw err;
  }

  const user = await User.findByPk(username);
  if (!user) {
    const err = new Error("Invalid username or password");
    err.statusCode = 401;
    throw err;
  }

  const ok = await bcrypt.compare(password, user.passwordhash);
  if (!ok) {
    const err = new Error("Invalid username or password");
    err.statusCode = 401;
    throw err;
  }

  const token = jwt.sign(
    {
      sub: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    }
  );

  res.json({
    ok: true,
    token,
    user: {
      username: user.username,
      role: user.role,
      created_on: user.created_on,
    },
  });
};