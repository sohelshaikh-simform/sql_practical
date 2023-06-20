const express=require('express');
const userRouter=require('./route/userRouter');
const productrouter=require('./route/productRouter');
const orderRouter=require('./route/orderRouter');
const orderDetailsRouter=require('./route/orderDetailsRouter');
const app=express()
require('./models')

app.use(express.json())
app.use('/',userRouter,productrouter,orderRouter,orderDetailsRouter)
app.listen(3000,()=>{
    console.log("app is listening on port 3000")
})