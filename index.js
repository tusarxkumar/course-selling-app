const express = require('express')
const app = express();
app.use(express.json())
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();
const URL = process.env.URL


const {userRouter} = require("./routes/user")
const {courseRouter} = require("./routes/course")
const {adminRouter} = require("./routes/admin")

app.use('/api/v1/user',userRouter)
app.use('/api/v1/course',courseRouter)
app.use('/api/v1/admin',adminRouter)


async function main(){
    await mongoose.connect(URL)
    app.listen(3000);
    console.log("Listening on port 3000")
}

main();


