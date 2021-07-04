const mongoose = require('mongoose')
const offerSchema=require('../Model/flightOfferModel.js')

//Connectiing to mongoose
const con3=mongoose.createConnection('your db name', {
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
