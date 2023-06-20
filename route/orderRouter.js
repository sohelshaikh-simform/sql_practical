const orderCtr=require('../controller/orderController');
const express=require('express');
const router=express.Router();
router.post('/createorder',orderCtr.createOrder);
router.get('/showAllOrder',orderCtr.showAllOrder);
router.get('/indetails',orderCtr.indetails);
// router.get('/showallproduct',productCtr.showallproduct);
module.exports=router