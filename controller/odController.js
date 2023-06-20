const db=require('../models');
const orderDetails=db.orderDetails;

const createOrderDetails=async(req,res)=>{
    const data=await orderDetails.create(req.body)
    res.status(201).json({status:"Success",data})
}
module.exports={createOrderDetails}