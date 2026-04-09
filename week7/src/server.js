const app = require("./app");
const sequelize = require("./config/db");

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to MySQL");

    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("DB connection failed:", err);
    process.exit(1);
  }
})();