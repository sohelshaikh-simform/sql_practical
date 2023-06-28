const sequelize = require("../DBConnection");

const Product = require("../models/product");


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


module.exports = { creteProduct, showallproduct };
