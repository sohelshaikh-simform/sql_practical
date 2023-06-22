const sequelize = require("../DBConnection");
const orderDetails = require("../models/orderDetails");
const Product = require("../models/product");

// Create OrderDetails
const createOrderDetails = async (req, res) => {
  const data = await orderDetails.create(req.body);
  res.status(201).json({ status: "Success", data });
};

// Most Expensive Order
const expensiveOrder = async (req, res) => {
  const topactive = await orderDetails.findAll({
    group: [["orderId"]],
    attributes: [
      "orderId",
      [sequelize.fn("SUM", sequelize.col("price")), "Total Amount"],
    ],
    include: [
      {
        model: Product,
        attributes: [],
      },
    ],
    order: [["Total Amount", "DESC"]],
    limit: 1,
  });
  res.status(201).json({ status: "success", topactive });
};

// Cheapest Order
const cheapestOrder = async (req, res) => {
  const topactive = await orderDetails.findAll({
    group: [["orderId"]],
    attributes: [
      "orderId",
      [sequelize.fn("SUM", sequelize.col("price")), "Total Amount"],
    ],
    include: [
      {
        model: Product,
        attributes: [],
      },
    ],
    order: ["Total Amount"],
    limit: 1,
  });
  res.status(201).json({ status: "success", topactive });
};

module.exports = { createOrderDetails, expensiveOrder, cheapestOrder };
