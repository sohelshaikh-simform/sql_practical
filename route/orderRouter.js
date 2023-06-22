const orderCtr = require("../controller/orderController");
const express = require("express");
const router = express.Router();

router.post("/createorder", orderCtr.createOrder);
router.get("/showAllOrder", orderCtr.showAllOrder);
router.get("/undeliveredOrder", orderCtr.undeliveredOrder);
router.get("/mostrecentOrders", orderCtr.mostrecentOrders);

module.exports = router;
