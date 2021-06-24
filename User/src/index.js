const express=require('express')
const PORT=process.env.PORT
require('./database/db/userDb')
const userRouter=require('./Service/router')
const app=express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(userRouter);
app.listen(PORT,()=>
{
    console.log(`Server is running in${PORT}`)
})

module.exports = app; 