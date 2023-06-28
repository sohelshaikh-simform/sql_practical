const User = require("./user");
const Order = require("./order");
const Product = require("./product");
const orderDetails = require("./orderDetails");

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Product, { through: "orderDetails" });
Product.belongsToMany(Order, { through: "orderDetails" });

Order.hasMany(orderDetails);
orderDetails.belongsTo(Order);
Product.hasMany(orderDetails);
orderDetails.belongsTo(Product);
