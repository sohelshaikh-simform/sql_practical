const sequelize = require("../DBConnection");
const orderDetails = require("../models/orderDetails");
const Product = require("../models/product");

// Create OrderDetails
const createOrderDetails = async (req, res) => {
  const data = await orderDetails.create(req.body);
  res.status(201).json({ status: "Success", data });
};

module.exports = { createOrderDetails};
