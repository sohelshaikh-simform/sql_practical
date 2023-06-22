const sequelize = require("../DBConnection");

const Product = require("../models/product");
const orderDetails = require("../models/orderDetails");

// create Product
const creteProduct = async (req, res) => {
  const data = await Product.create(req.body);
  res.status(201).json({ status: "Success", data });
};

// Show all product
const showallproduct = async (req, res) => {
  const data = await Product.findAll();
  res.status(201).json({ status: "Success", data });
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
module.exports = { creteProduct, showallproduct, mostPurchased };
