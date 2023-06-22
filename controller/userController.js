const sequelize = require("../DBConnection");

const User = require("../models/user");
const Product = require("../models/product");
const Order = require("../models/order");

// Create User
const addUser = async (req, res) => {
  const exitUser = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (exitUser) {
    return res
      .status(400)
      .json({ status: "fail", message: "User already exit" });
  }
  const user = await User.create(req.body);
  res.status(201).json({ status: "success", user });
};

// Show All User
const showAll = async (req, res) => {
  const allUser = await User.findAll();
  res.status(201).json({ status: "success", allUser });
};

// all the User order list and include Customer nameProduct namesOrder Date Expected delivery date
const queryOne = async (req, res) => {
  const queryOneResult = await User.findAll({
    attributes: [["username", "Customer name"]],
    include: [
      {
        model: Order,
        attributes: [["createdAt", "Order Date"], "expected_delivery_date"],
        include: [
          { model: Product, attributes: [["productName", "Product Name"]] },
        ],
      },
    ],
  });
  res.status(201).json({ status: "success", queryOneResult });
};

// Inactive users (Users who hasn’t done any order)
const inactiveUser = async (req, res) => {
  // select *from users where id not in(select userid from orders);
  const inactive = await User.findAll({
    attributes: ["username", "email", "address", "phoneNumber"],
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
        attributes: ["username", "email"],
      },
    ],
    order: [["Total Orders", "DESC"]],
    limit: 5,
  });
  res.status(201).json({ status: "success", topactive });
};

module.exports = {
  addUser,
  showAll,
  queryOne,
  inactiveUser,
  activeUser,
};
