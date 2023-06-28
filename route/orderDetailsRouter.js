const orderDetailsCtr = require("../controller/orderDetailsController");
const express = require("express");
const router = express.Router();
router.post("/createorderdetails", orderDetailsCtr.createOrderDetails);

module.exports = router;
