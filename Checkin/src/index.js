const express=require('express')
const app=express()
const PORT=process.env.PORT
const adminRouter=require('./Service/router')


app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(adminRouter)
app.listen(PORT,()=>
{
    console.log(`Checkin Server is running in ${PORT}`)
})

module.exports=app