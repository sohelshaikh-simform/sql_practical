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

// Undelivered Orders
const undeliveredOrder = async (req, res) => {
  // select * from orders where order_status="undelivered";
  const data = await Order.findAll({ where: { order_status: "undelivered" } });
  res.status(200).json({ status: "Success", data });
};

// Most Recent Orders
const mostrecentOrders = async (req, res) => {
  // select * from orders order by createdAt limit 5;
  const data = await Order.findAll({
    order: [["createdAt", "DESC"]],
    limit: 5,
  });
  res.status(200).json({ status: "Success", data });
};

module.exports = {
  createOrder,
  showAllOrder,
  undeliveredOrder,
  mostrecentOrders,
};
