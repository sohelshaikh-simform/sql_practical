const express = require("express");
const userRouter = require("./route/userRouter");
const productrouter = require("./route/productRouter");
const orderRouter = require("./route/orderRouter");
const orderDetailsRouter = require("./route/orderDetailsRouter");
const app = express();
require("./DBConnection");

const User = require("./models/user");
const Order = require("./models/order");
const Product = require("./models/product");
const orderDetails = require("./models/orderDetails");

User.hasMany(Order);
Order.belongsTo(User);

Product.belongsToMany(Order, { through: "orderDetails" });
Order.belongsToMany(Product, { through: "orderDetails" });

Product.hasMany(orderDetails);
orderDetails.belongsTo(Product);

Order.hasMany(orderDetails);
orderDetails.belongsTo(Order);

app.use(express.json());
app.use("/", userRouter, productrouter, orderRouter, orderDetailsRouter);
app.listen(3000, () => {
  console.log("app is listening on port 3000");
});
