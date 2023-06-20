const express=require('express');
const userRouter=require('./route/userRouter')
const app=express()
require('./models')

app.use(express.json())
app.use('/',userRouter)
app.listen(3000,()=>{
    console.log("app is listening on port 3000")
})