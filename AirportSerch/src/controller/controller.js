const Airport=require('../database/db/airport')

//Getting airport through city name
module.exports.getflighairport =async (req, res) => {
  try {
    const airport = await Airport.cityName(req.body.cityname)
    if(airport.length===0)
    {
      res.status(404).send("Airports of that city will be added soon")
      return 
    }
    res.status(200).send( airport)
} catch (e) {
    res.status(400).send(e.message)
}
  }

//Verifying if iataCode of airline is there on db
module.exports.getflighiata =async (req, res) => {
    try {
      const airport = await Airport.cityCodeverification(req.body.iataCode)
      if(airport===[])
      {
        throw new Error("iatacode not added")
      }
      res.send({ airport})
  } catch (e) {
      res.status(400).send(e.message)
  }
    }