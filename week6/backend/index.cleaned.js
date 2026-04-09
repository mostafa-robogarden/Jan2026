require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { Sequelize, DataTypes } = require("sequelize");
const app = express();
app.use(cors());
app.use(express.json());

// ---- 1) Database connection (Sequelize) ----
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    dialect: "mysql",
    logging: false,
  }
);

// ---- 2) Model: users table ----
const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    passwordhash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
    created_on: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);
function safeUser(u) {
  return {
    username: u.username,
    role: u.role,
    created_on: u.created_on,
  };
}
// ---- 3) Start-up: verify DB connection ----
async function start() {
  try {
    await sequelize.authenticate();
    console.log("Connected to MySQL via Sequelize");
    const port = Number(process.env.PORT || 3000);
    app.listen(port, () => console.log(`API running on http://localhost:${port}`));
  } catch (err) {
    console.error("DB connection failed (full error):", err);
    console.error("Config:", {
      DB_HOST: process.env.DB_HOST,
      DB_PORT: process.env.DB_PORT,
      DB_USER: process.env.DB_USER,
      DB_NAME: process.env.DB_NAME,
    });
    process.exit(1);
  }
}
start();

// ---- 4) Routes ----
app.get("/", (req, res) => {
  res.send("API is running");
});

// GET all employees (users)
app.get("/employees", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["username", "role", "created_on"],
      order: [["created_on", "DESC"]],
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one employee by username
app.get("/employees/:username", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.username, {
      attributes: ["username", "role", "created_on"],
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create employee
app.post("/employees", async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "username and password are required" });
    }

    // Make sure username is unique
    const existing = await User.findByPk(username);
    if (existing) {
      return res.status(409).json({ error: "username already exists" });
    }

    const saltRounds = 10;
    const passwordhash = await bcrypt.hash(password, saltRounds);

    const created = await User.create({
      username,
      passwordhash,
      role: role || "user",
      created_on: new Date(),
    });

    res.status(201).json(safeUser(created));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update employee (role and/or password)
app.put("/employees/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const { role, password } = req.body;

    const user = await User.findByPk(username);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (role !== undefined) user.role = role;

    if (password !== undefined && password !== "") {
      const saltRounds = 10;
      user.passwordhash = await bcrypt.hash(password, saltRounds);
    }

    await user.save();
    res.json(safeUser(user));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE employee
app.delete("/employees/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const deletedCount = await User.destroy({ where: { username } });

    if (deletedCount === 0) return res.status(404).json({ error: "User not found" });

    res.json({ message: "Deleted", username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST login (checks MySQL + bcrypt.compare)
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "username and password are required" });
    }
    const user = await User.findByPk(username);
    if (!user) return res.status(401).json({ ok: false, error: "Invalid username or password" });
    const matches = await bcrypt.compare(password, user.passwordhash);
    if (!matches) return res.status(401).json({ ok: false, error: "Invalid username or password" });
    res.json({ ok: true, user: safeUser(user) });
  } 
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});
