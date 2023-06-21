const db = require("../models");
const Order = db.order;
const Product = db.product;

const createOrder = async (req, res) => {
  const data = await Order.create(req.body);
  res.status(201).json({ status: "Success", data });
};

const showAllOrder = async (req, res) => {
  const data = await Order.findAll();
  res.status(200).json({ status: "Success", data });
};

const indetails = async (req, res) => {
  const data = await Order.findAll({ include: [{ model: Product }] });
  res.status(200).json({ status: "Success", data });
};

const undeliveredOrder = async (req, res) => {
    // select * from orders where order_status="undelivered";
    const data = await Order.findAll({ where: { order_status: "undelivered" } });
    res.status(200).json({ status: "Success", data });
};

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
  indetails,
  undeliveredOrder,
  mostrecentOrders,

};
