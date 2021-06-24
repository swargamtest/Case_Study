const express=require('express')
const app=express()
const amadeus=require('./Service/amadeusAuth')
const PORT=process.env.PORT
const adminRouter=require('./Service/router')

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(adminRouter)

// amadeus.referenceData.airlines.get({
//     airlineCodes : '6E'
//   }).then((response)=>
//   {
//       console.log(response.data)
//   }).catch((responseError)=>
//   {
//       console.log(responseError.code)
//   });
// try {
//     amadeus.booking.flightOrder('eJzTd9cPdo9yDA0AAAurAoA%3D').delete().then(data=>console.log(data))

// } catch (error) {
//     console.log(error)
// }
app.listen(PORT,()=>
{
    console.log(`Server is running in ${PORT}`)
})

module.exports=app