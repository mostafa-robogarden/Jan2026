const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "User",
  {
    username: { type: DataTypes.STRING, primaryKey: true },
    passwordhash: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
    created_on: { type: DataTypes.DATE, allowNull: false },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

module.exports = User;