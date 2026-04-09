const express = require("express");
const cors = require("cors");

const employeeRoutes = require("./routes/employeeRoutes");
const authRoutes = require("./routes/authRoutes");

const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API is running ✅"));

app.use("/employees", employeeRoutes);
app.use("/", authRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;