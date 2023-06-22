const orderDetailsCtr = require("../controller/odController");
const express = require("express");
const router = express.Router();
router.post("/createorderdetails", orderDetailsCtr.createOrderDetails);
router.get("/expensiveOrder", orderDetailsCtr.expensiveOrder);
router.get("/cheapestOrder", orderDetailsCtr.cheapestOrder);
// router.get('/showallproduct',productCtr.showallproduct);
module.exports = router;
