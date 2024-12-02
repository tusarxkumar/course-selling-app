// const express = require('express')
// const Router = express.Router;

const {Router} = require('express');
const userRouter = Router();

    userRouter.post("/signup",function(req,res){
        res.json({
            message: "Signup endpoint"
        })
    })
    
    userRouter.post("/signin",function(req,res){
        res.json({
            message: "Login endpoint"
        })
    })
    
    userRouter.get("/purchases",function(req,res){
        res.json({
            message: "Purchases endpoint"
        })
    })

module.exports = {
    userRouter: userRouter
}


