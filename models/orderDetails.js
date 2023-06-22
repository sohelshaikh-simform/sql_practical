const sequelize = require("../DBConnection");
const { DataTypes } = require("sequelize");
const orderDetails = sequelize.define(
  "orderDetails",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
    },
    productId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);
module.exports = orderDetails;
