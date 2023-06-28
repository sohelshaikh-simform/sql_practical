const orderCtr = require("../controller/orderController");
const express = require("express");
const router = express.Router();

router.post("/createorder", orderCtr.createOrder);
router.get("/showAllOrder", orderCtr.showAllOrder);


module.exports = router;
