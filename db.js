// const mongoose = require("mongoose")
// const Schema = mongoose.Schema;
const {Schema, default: mongoose} = require("mongoose")
const ObjectId = Schema.ObjectId;


const userSchema = new Schema({
    email: {type:String , unique: true},
    password: String,
    firstName: String,
    lastName: String
})

const adminSchema = new Schema({
    email: {type:String , unique: true},
    password: String,
    firstName: String,
    lastName: String
})
const courseSchema = new Schema({
    title: String,
    description : String,
    price : Number,
    imageUrl: String,
    creatorId: ObjectId
})
const purchaseSchema = new Schema({
    courseId: ObjectId,
    userId: ObjectId
})

const userModel = mongoose.model("users", userSchema)
const adminModel = mongoose.model("admin", adminSchema)
const courseModel = mongoose.model("course", courseSchema)
const purchaseModel = mongoose.model("purchase", purchaseSchema)

module.exports = {
    userModel:userModel,
    adminModel:adminModel,
    courseModel:courseModel,
    purchaseModel:purchaseModel,
}