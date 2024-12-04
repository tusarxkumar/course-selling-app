const bcrypt = require("bcrypt")
const { Router } = require("express")
const { adminModel, courseModel } = require("../db")
const adminRouter = Router();
const jwt = require("jsonwebtoken")
const { z } = require("zod")
const { adminMiddleware } = require("../middleware/admin");
const admin = require("../middleware/admin");
const course = require("./course");



adminRouter.post("/signup", async function (req, res) {
    const { email, password, firstName, lastName } = req.body;
    //Input validation using zod
    const requiredBody = z.object({
        email: z.string().email(),
        password: z.string(),
        firstName: z.string(),
        lastName: z.string(),
    })
    const parsedDataWithSuccess = requiredBody.safeParse(req.body)
    if (!parsedDataWithSuccess.success) {
        res.status(403).json({
            message: "Incorrect format",
            error: parsedDataWithSuccess.error
        })
    }
    let errorThrown = false;
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        await adminModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        })
    } catch (e) {
        res.json({
            message: "Admin already exists",
            errorThrown: true
        })
    }
    if (!errorThrown) {
        res.json({
            message: "Admin signup successful"
        })
    }
})

adminRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body;
    const requiredBody = z.object({
        email: z.string().email(),
        password: z.string().min(4).max(10)
    })
    const parsedDataWithSuccess = requiredBody.safeParse(req.body)
    if (!parsedDataWithSuccess.success) {
        res.status(403).json({
            message: "Incorrect format",
            error: parsedDataWithSuccess.error
        })
    }
    const admin = await adminModel.findOne({
        email,
        // password 
    })
    if (!admin) {
        res.json({
            message: "Admin doesn't exists"
        })
    }
    const passwordMatch = await bcrypt.compare(password, admin.password)
    if (passwordMatch) {
        const token = jwt.sign({
            id: admin._id
        }, process.env.JWT_ADMIN_SECRET)
        res.json({
            token: token
        })
    } else {
        res.json({
            message: "Incorrect credentials"
        })
    }
})

adminRouter.post("/course", adminMiddleware, async function (req, res) {
    const adminId = req.adminId;
    const {title, description,price, imageUrl, creatorId} = req.body

    const course = await courseModel.create({
        title,
        description,
        price,
        imageUrl,
        creatorId:adminId
    })
    res.json({
        message:"course created",
        courseId:course._id
    })
})

adminRouter.put("/course", adminMiddleware ,async function (req, res) {
    const adminId = req.adminId;
    const {title, description, price, imageUrl, courseId} = req.body

    const course = await courseModel.updateOne({
        _id:courseId,
        creatorId:adminId
    },{
        title,
        description,
        price,
        imageUrl,
    })
    res.json({
        message:"course updated",
        courseId:course._id
    })
})

adminRouter.get("/course/bulk", adminMiddleware, async function (req, res) {
    const adminId = req.adminId;

    const courses = await courseModel.find({
        creatorId:adminId
    })
    res.json({
        message:"course updated",
        courses
    })
})

module.exports = {
    adminRouter: adminRouter
}