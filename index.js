
const express = require('express')
const app = express();
const {userRouter} = require("./routes/user")
const {courseRouter} = require("./routes/course")

app.use('/api/v1/user',userRouter)
app.use('/api/v1/course',courseRouter)
app.use('/api/v1/course',courseRouter1)
app.use('/api/v1/course',courseRouter2)

app.listen(3000);


