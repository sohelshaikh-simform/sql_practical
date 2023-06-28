const sequelize = require("../DBConnection");
const { DataTypes } = require("sequelize");
const orderDetails = sequelize.define(
  "orderDetails",
  {
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
