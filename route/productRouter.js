const productCtr = require("../controller/productController");
const express = require("express");
const router = express.Router();
router.post("/createproduct", productCtr.creteProduct);
router.get("/showallproduct", productCtr.showallproduct);
router.get("/mostPurchased", productCtr.mostPurchased);
module.exports = router;
