const mongoose = require('mongoose')
const airportschema=require('../Model/airportModel')

//Connectiing to mongoose
const con2=mongoose.createConnection('mongodb+srv://SwargamTest:Swargam123@cluster0.izarr.mongodb.net/AirportData?retryWrites=true&w=majority', {
 useNewUrlParser: true,
 useCreateIndex: true,
 useUnifiedTopology: true
})
con2.then(()=>{
    console.log(`connection to Airport database established`)
  }).catch(err=>{
    console.log(`db error ${err.message}`);
    process.exit(-1)
  })
  
  airportschema.statics.cityName = async (cityname) => {
    const airport = await Airport.find({ cityname })

    if (!airport) {
        throw new Error('Airports will be added soon for your place')
    }

    
    return airport
}
airportschema.statics.cityCodeverification = async (iataCode) => {
  const airport = await Airport.findOne({ iataCode })

  if (!airport) {
      throw new Error('iata code is not valid')
  }

  
  return airport
}

const Airport = con2.model('Airport', airportschema)
module.exports=Airport