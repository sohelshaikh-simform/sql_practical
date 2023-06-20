const db = require("../models");
const User = db.user;

const addUser = async (req, res) => {
  const exitUser = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (exitUser) {
    return res
      .status(400)
      .json({ status: "fail", message: "User already exit" });
  }

  const user = await User.create(req.body);
  res.status(201).json({ status: "success", user });
};

const showAll=async(req,res)=>{
    const allUser=await User.findAll();
    res.status(201).json({ status: "success", allUser });
}
module.exports = {
  addUser,showAll
};
