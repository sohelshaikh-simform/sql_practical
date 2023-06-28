const sequelize = require("../DBConnection");
const Order = require("../models/order");
const Product = require("../models/product");

//  Create Order
const createOrder = async (req, res) => {
  const data = await Order.create(req.body);
  res.status(201).json({ status: "Success", data });
};

// Show All Order
const showAllOrder = async (req, res) => {
  const data = await Order.findAll();
  res.status(200).json({ status: "Success", data });
};


module.exports = {
  createOrder,
  showAllOrder,
};
