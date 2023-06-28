const express = require("express");
const app = express();
app.use(express.json());

const userRouter = require("./route/userRouter");
const productrouter = require("./route/productRouter");
const orderRouter = require("./route/orderRouter");
const orderDetailsRouter = require("./route/orderDetailsRouter");
const queryRouter = require("./route/queryRouter");

require("./DBConnection");
require("./models/syncTable");

app.use(
  "/",
  userRouter,
  productrouter,
  orderRouter,
  orderDetailsRouter,
  queryRouter
);

app.listen(3000, () => {
  console.log("app is listening on port 3000");
});
