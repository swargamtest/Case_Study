const mongoose = require('mongoose')
const airportschema=require('../Model/airportModel')

//Connectiing to mongoose
const con2=mongoose.createConnection('your db name', {
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
    const user = await Airport.find({ cityname })

    if (!user) {
        throw new Error('Airports will be added soon for your place')
    }

    
    return user
}
airportschema.statics.cityCodeverification = async (iataCode) => {
  const user = await Airport.findOne({ iataCode })

  if (!user) {
      throw new Error('iata code is not valid')
  }

  
  return user
}
const Airport = con2.model('Airport', airportschema)
module.exports=Airport
