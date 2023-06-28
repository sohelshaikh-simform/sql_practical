const userCtr = require("../controller/userController");
const express = require("express");
const router = express.Router();

router.post("/addUser", userCtr.addUser);
router.get("/showall", userCtr.showAll);

module.exports = router;
