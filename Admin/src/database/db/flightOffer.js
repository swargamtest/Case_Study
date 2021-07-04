const mongoose = require('mongoose')
const offerSchema=require('../Model/flightOfferModel.js')

//Connectiing to mongoose
const con3=mongoose.createConnection('mongodb+srv://SwargamTest:Swargam123@cluster0.izarr.mongodb.net/FlightOffers?retryWrites=true&w=majority', {
 useNewUrlParser: true,
 useCreateIndex: true,
 useUnifiedTopology: true
})
con3.then(()=>{
    console.log(`connection to flightOffers database established`)
  }).catch(err=>{
    console.log(`db error ${err.message}`);
    process.exit(-1)
  })

const FlightOffers = con3.model('FlightOffers', offerSchema)
module.exports=FlightOffers