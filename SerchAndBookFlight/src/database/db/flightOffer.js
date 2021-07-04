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

  offerSchema.statics.findByDates = async (departureDate, arrivalDate) => {
    const user = await FlightOffers.findOne({ departureDate,arrivalDate })

    if (!user) {
        throw new Error('There are no flight offers in current arrival and departure date')
    }

    return user
}
offerSchema.statics.findByoffers = async (offer) => {
  const user = await FlightOffers.findOne({ offers:offer })

  if (!user) {
      throw new Error('Flight offer not available')
  }

  return user
}
const FlightOffers = con3.model('FlightOffers', offerSchema)
module.exports=FlightOffers
