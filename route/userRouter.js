const userCtr = require("../controller/userController");
const express = require("express");
const router = express.Router();
router.post("/addUser", userCtr.addUser);
router.get("/showall", userCtr.showAll);
router.get("/queryOne", userCtr.queryOne);
router.get("/inactiveUser", userCtr.inactiveUser);
router.get("/activeUser", userCtr.activeUser);
module.exports = router;
