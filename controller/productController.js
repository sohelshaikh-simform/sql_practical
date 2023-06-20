const db=require('../models')
const Product=db.product;

const creteProduct=async (req,res)=>{
    const data=await Product.create(req.body);
    // console.log(req.body)
    res.status(201).json({status:"Success",data})
}

const showallproduct=async (req,res)=>{
    const data=await Product.findAll();
    res.status(201).json({status:"Success",data})
}
module.exports={creteProduct,showallproduct}