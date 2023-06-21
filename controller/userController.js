const { sequelize } = require("../models");
const db = require("../models");
const User = db.user;
const Product = db.product;
const Order = db.order;
const orderDetails = db.orderDetails;

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

const showAll = async (req, res) => {
  const allUser = await User.findAll();
  res.status(201).json({ status: "success", allUser });
};

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



const activeUser = async (req, res) => {
//   const active = await sequelize.query(
//   "select users.username,COUNT(orders.userId) as totalOrder from users  LEFT OUTER JOIN `orders` AS `orders` ON `users`.`id` = `orders`.`userId` group by users.id order by count(orders.userId) DESC limit 5"
// );
  const topactive = await Order.findAll({

    group: ["userId"],
      attributes: [
        "userId",
        [
          sequelize.fn("COUNT", sequelize.col("userId")),
          "Total Orders",
        ],
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
