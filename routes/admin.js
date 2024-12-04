const {Router} = require("express")
const {adminModel} = require("../db")
const adminRouter = Router();

    adminRouter.post("/signup",function(req,res){
        const username = req.body.username;
        const password = req.body.password;
        
        res.json({
            message: "admin signed up"
        })
    })

    adminRouter.post("/signin",function(req,res){
        res.json({
            message: "admin signed in"
        })
    })

    adminRouter.post("/",function(req,res){
        res.json({
            message: "Courses"
        })
    })

    adminRouter.put("/",function(req,res){
        res.json({
            message: "Courses inserted or deleted"
        })
    })

    adminRouter.post("/bulk",function(req,res){
        res.json({
            message: "Courses inserted or deleted"
        })
    })

module.exports = {
    adminRouter: adminRouter
}