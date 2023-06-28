const sequelize = require("../DBConnection");

const User = require("../models/user");
const Product = require("../models/product");
const Order = require("../models/order");
const orderDetails = require("../models/orderDetails");

// all the User order list and include Customer nameProduct namesOrder Date Expected delivery date
const queryOne = async (req, res) => {
  const queryOneResult = await User.findAll({
    attributes: [["username", "Customer name"]],
    include: [
      {
        model: Order,
        attributes: [
          ["createdAt", "Order Date"],
          [
            sequelize.literal(
              "DATEDIFF(orders.expected_delivery_date, orders.createdAt)"
            ),

            "Expected_delivery_date",
          ],
        ],

        include: [
          {
            model: Product,
            attributes: [["productName", "Product Name"]],
            through: { attributes: [] },
          },
        ],
      },
    ],
  });
  res.status(201).json({ status: "success", queryOneResult });
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

// Top 5 active users (Users having most number of orders)
const activeUser = async (req, res) => {
  const topactive = await Order.findAll({
    group: ["userId"],
    attributes: [
      "userId",
      [sequelize.fn("COUNT", sequelize.col("userId")), "Total Orders"],
    ],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
    order: [["Total Orders", "DESC"]],
    limit: 5,
  });
  res.status(201).json({ status: "success", topactive });
};

// Inactive users (Users who hasn’t done any order)
const inactiveUser = async (req, res) => {
  // select *from users where id not in(select userid from orders);
  const inactive = await User.findAll({
    attributes: ["username", "address", "phoneNumber"],
    include: {
      model: Order,
      required: false,
    },
    where: {
      "$orders.id$": null,
    },
  });
  res.status(201).json({ status: "success", inactive });
};

// Top 5 Most Purchased Product
const mostPurchased = async (req, res) => {
  const data = await orderDetails.findAll({
    group: ["productId"],
    attributes: [
      "productId",
      [sequelize.fn("COUNT", sequelize.col("productId")), "Purchased_Count"],
    ],
    include: [{ model: Product }],
    order: [["Purchased_Count", "DESC"]],
    limit: 5,
  });
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

module.exports = {
  queryOne,
  undeliveredOrder,
  mostrecentOrders,
  activeUser,
  inactiveUser,
  mostPurchased,
  expensiveOrder,
  cheapestOrder,
};
