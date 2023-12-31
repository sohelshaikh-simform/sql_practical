const queryController = require("../controller/queryController");
const express = require("express");
const router = express.Router();
router.get("/queryOne", queryController.queryOne);
router.get("/undeliveredOrder", queryController.undeliveredOrder);
router.get("/mostrecentOrders", queryController.mostrecentOrders);
router.get("/activeUser", queryController.activeUser);
router.get("/inactiveUser", queryController.inactiveUser);
router.get("/mostPurchased", queryController.mostPurchased);
router.get("/expensiveOrder", queryController.expensiveOrder);
router.get("/cheapestOrder", queryController.cheapestOrder);
module.exports = router;
