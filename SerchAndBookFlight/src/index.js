const express=require('express')
const app=express()
const PORT=process.env.PORT
const serchRouter=require('./Service/router')

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(serchRouter)

app.listen(PORT,()=>
{
    console.log(`Serch And Booking Server is running in ${PORT}`)
})

module.exports=app