// const express = require('express')
// const Router = express.Router;
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {Router} = require('express');
const userRouter = Router();
const { z } = require("zod");
const { userModel } = require("../db");

    userRouter.post("/signup",async function(req,res){
        // const email = req.body.email
        // const password = req.body.password
        // const firstName = req.body.firstName
        // const lastName = req.body.lastName
        const {email, password, firstName, lastName} = req.body; // Destructuring 
        
        //Input validation using Zod
        const requiredBody = z.object({
            email:z.string().email(),
            password:z.string().min(4).max(10),
            firstName:z.string().max(100),
            lastName:z.string().max(100)
        })
        const parsedDataWithSuccess = requiredBody.safeParse(req.body)
        if(!parsedDataWithSuccess.success){
            res.status(403).json({
                message:"Incorrect Format",
                error:parsedDataWithSuccess.error
            })
            return
        }

        let errorThrown = false;
        
        try{
            const hashedPassword = await bcrypt.hash(password,5)
            await userModel.create({
                email:email,
                password:hashedPassword,
                firstName:firstName,
                lastName:lastName
            })
        }catch(e){
            res.json({
                message:"User already exists"
            })
            errorThrown=true
        }
        if(!errorThrown){
            res.json({
                message:"Successfully signed up"
            })
        }
    })
    
    userRouter.post("/signin", async function(req,res){

        const { email , password } = req.body;
        //Input validation
        const requiredBody = z.object({
            email: z.string().email(),
            password: z.string().min(3).max(10)
        })
        const parsedDataWithSuccess = requiredBody.safeParse(req.body)
        if(!parsedDataWithSuccess.success){
            res.json({
                message: "Incorrect Format",
                error: parsedDataWithSuccess.error
            })
            return
        }
        
        const user = await userModel.findOne({
            email:email,
            // password:password
        })
        if(!user){
            res.status(403).json({
                message: "User doesn't exists"
            })
        }
        const passwordMatch = await bcrypt.compare(password,user.password)
        if(passwordMatch){
            const token = jwt.sign({
                id: user._id,
            }, process.env.JWT_SECRET)
            res.json({
                token:token
            })
        }else{
            res.json({
                message: "Incorrect Credentials"
            })
        }
    })
    
    userRouter.get("/purchases",function(req,res){
        res.json({
            message: "Purchases endpoint"
        })
    })

module.exports = {
    userRouter: userRouter
}


