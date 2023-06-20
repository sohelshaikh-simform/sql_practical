const db=require('../models');
const Order=db.order;
const Product=db.product;

const createOrder=async(req,res)=>{
    const data=await Order.create(req.body)
    res.status(201).json({status:"Success",data})
}

const showAllOrder=async(req,res)=>{
    const data=await Order.findAll()
    res.status(201).json({status:"Success",data})
}

const indetails=async(req,res)=>{
    const data=await Order.findAll({include:[{model:Product}]})
    res.status(201).json({status:"Success",data})
}
module.exports={createOrder,showAllOrder,indetails}