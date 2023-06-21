const { sequelize } = require("../models");
const db = require("../models");
const orderDetails = db.orderDetails;
const User = db.user;
const Product = db.product;
const Order = db.order;

const createOrderDetails = async (req, res) => {
  const data = await orderDetails.create(req.body);
  res.status(201).json({ status: "Success", data });
};
const expensiveOrder = async (req, res) => {
  const topactive = await orderDetails.findAll({ 
    group: [["orderId"]],
    attributes: [
      "orderId",
      [
        sequelize.fn("SUM",sequelize.col("price")),
        "Total Amount",
      ],
    ],
    include: [
      {
        model:Product,
        attributes: [],
      },
    ],
    order: [["Total Amount", "DESC"]],
    limit: 1,
  });
  res.status(201).json({ status: "success", topactive });
};

const cheapestOrder = async (req, res) => {
  const topactive = await orderDetails.findAll({ 
    group: [["orderId"]],
    attributes: [
      "orderId",
      [
        sequelize.fn("SUM",sequelize.col("price")),
        "Total Amount",
      ],
    ],
    include: [
      {
        model:Product,
        attributes: [],
      },
    ],
    order: ["Total Amount"],
    limit: 1,
  });
  res.status(201).json({ status: "success", topactive });
};
module.exports = { createOrderDetails, expensiveOrder,cheapestOrder};
