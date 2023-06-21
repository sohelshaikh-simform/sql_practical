const { sequelize } = require("../models");
const db = require("../models");
const Product = db.product;
const orderDetails = db.orderDetails;

const creteProduct = async (req, res) => {
  const data = await Product.create(req.body);
  // console.log(req.body)
  res.status(201).json({ status: "Success", data });
};

const showallproduct = async (req, res) => {
  const data = await Product.findAll();
  res.status(201).json({ status: "Success", data });
};

const mostPurchased = async (req, res) => {
  const data = await orderDetails.findAll({
    group: ["productId"],
    attributes: ["productId",[sequelize.fn('COUNT',sequelize.col('productId')),"Purchased_Count"]],
    include: [{ model: Product }],
    order:[["Purchased_Count","DESC"]],
    limit:5
  });
  res.status(201).json({ status: "Success", data });
};
module.exports = { creteProduct, showallproduct, mostPurchased };
