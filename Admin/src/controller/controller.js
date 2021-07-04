const amadeus=require('../Service/amadeusAuth')
const Ticket=require('../database/db/ticketinfo')
const Airport=require('../database/db/airport')
const FlightOffers=require('../database/db/flightOffer')
const client=require('../Service/twilio')


module.exports.homepage = (req, res) => {
    res.send('testing');
  }

module.exports.citySerch = async (req, res) => { 
  try {
    var keywords = req.query.keyword; 
    const response = await amadeus.referenceData.locations 
      .get({ 
        keyword: keywords, 
        subType: "CITY,AIRPORT", 
      })
      res.status(200).send(response.body)
     
  } catch (error) 
  {
    res.status.send('Error no city Found')
  }
   
 }
 module.exports.addAirport = async (req, res) => {
   try {
    let airportData=
    {
      cityname:req.body.cityname,
      iataCode:req.body.iataCode,
      detailedName:req.body.detailedName
    }
    const airport =  new Airport(airportData)
    await airport.save()
    if(airport)
    {
      res.status(201).send(airport)
    }
    
   } catch (error) {
     res.status(400).send("Airport not added")
     console.log(error)
   }
 
}

module.exports.date = async function (req, res) { 
    console.log(req.body); 
    departure = req.body.departure; 
    arrival = req.body.arrival; 
    locationDeparture = req.body.locationDeparture; 
    locationArrival = req.body.locationArrival; 
    try{
    const location = await Airport.cityCodeverification(locationDeparture)
    const airport = await Airport.cityCodeverification(locationArrival)
    const response = await amadeus.shopping.flightOffersSearch 
      .get({ 
        originLocationCode: locationDeparture, 
        destinationLocationCode: locationArrival, 
        departureDate: departure, 
        adults: "1", 
      }) 
      .catch((err) => console.log(err)); 
    
      // await res.json(JSON.parse(response.meta)); 
      await res.send(response.result.data)
      // con
 
    } catch (err) { 
      await res.status(400).send(err.message); 
    } 
  }

  module.exports.flightPriceoffers = async function (req, res) { 
    console.log(req.body); 
    departure = req.body.departure; 
    arrival = req.body.arrival;
    offers=req.body.data
    try{
      let bodyObject=
      {
        departureDate:departure,
        arrivalDate:arrival,
        offers
      }
      const offersdata =  new FlightOffers(bodyObject)
      await offersdata.save() 
      console.log(offersdata)
      res.status(201).send(offersdata)

 
    } catch (err) { 
      await res.status(400).send(err.message); 
    } 
  }

  module.exports.flightPrice = async function(req, res) {
    // res.json(req.body);
    inputFlight = req.body;
    console.log(req.body)
    const responsePricing = await amadeus.shopping.flightOffers.pricing.post(
        JSON.stringify({
          'data': {
            'type': 'flight-offers-pricing',
            'flightOffers': [inputFlight]
          }})).catch(err=>console.log(err))
     try {
      await res.json(JSON.parse(responsePricing.body));
    } catch (err) {
      await res.json(err);
    }
}
    
module.exports.flightOrder =  async function(req, res) {
    // res.json(req.body);
    let inputFlightCreateOrder = req.body.order;
    let fristName=req.body.fname
    let lastName=req.body.lname
    let number=req.body.number
    let email=req.body.email

  console.log(req.body)
  const returnBokkin = amadeus.booking.flightOrders.post(
        JSON.stringify({
    "data": {
      "type": "flight-order",
      "flightOffers": [
             inputFlightCreateOrder
          ],
      "travelers": [
        {
          "id": "1",
          // "dateOfBirth": "2012-10-11",
          // "gender": "FEMALE",
          "contact": {
            "emailAddress": email,
            "phones": [
              {
                "deviceType": "MOBILE",
                "countryCallingCode": "91",
                "number": number
              }
            ]
          },
          "name": {
            "firstName": fristName,
            "lastName": lastName
          }
        }
      ]
    }
  })
      ).then(function(response){
      console.log(response.result.data.id);
      console.log(response.result.data.travelers[0].name.firstName);
      console.log(response.result.data.travelers[0].contact.phones[0].number);
      console.log(response.result.data.travelers[0].contact.emailAddress);
           
          client.messages
          .create({
            body: `Congratulation! ${response.result.data.travelers[0].name.firstName} your ticket with booking reference ID ${response.result.data.id} has been booked successfully.`,
            from: '+17177272396',
            to: `+91${response.result.data.travelers[0].contact.phones[0].number}`
          })
          .then(message => console.log(message.sid)).catch(e => { console.error('Got an error:', e.code, e.message); });
      const ticketInfo={
        fname:response.result.data.travelers[0].name.firstName,
        lname:response.result.data.travelers[0].name.lastName,
        email:response.result.data.travelers[0].contact.emailAddress,
        ticketId:response.result.data.id
      }
      const ticket = new Ticket(ticketInfo)
      addticket(ticket)
      res.json(response.result)
  }).catch(function(responseError){
      console.log(responseError);
      
  });
  }

  module.exports.getTicketInfo = async (req, res) => {
    try {
      const user = await Ticket.find({})
      if(user.length===0)
      {
        res.status(404).send('No ticket at all')
        return
      }
      res.status(200).send({ user })
  } catch (e) {
      res.status(400).send(e.message)
  }
  }

  module.exports.deleteTicket =async (req, res) => {
    try {
      const deleteTicket = await amadeus.booking.flightOrder(req.body.ticketId).delete()
      const ticket=await Ticket.findByBookingId(req.body.ticketId)
      const user=await Ticket.deleteOne(req.body)
      if(user.deletedCount===1)
      {
        res.status(200).send(`${ticket[0].fname}  ${ticket[0].lname} ticket with reference ID ${req.body.ticketId} has been cancelled and they will get inform shortly`)
      }
      else
      {
        res.status(404).send('No ticket Found')
       

      }
      
    } catch (error) {
       res.status(404).send('No ticket found')
       console.log(error)
    }
  }

  module.exports.singleTicketInfo = async (req, res) => {
    try {
      const ticket= await  amadeus.booking.flightOrder(req.query.ticketId).get()
       console.log(ticket)
       res.send(ticket)

    } catch (error) {
      res.send(error.description[0].detail)
    }
   
  }


//DatabaseFunction
  const addticket=async(ticket)=>
  {
    try {
      await ticket.save()
      console.log(ticket)
     }
    catch (e) {
       console.log(e)
      }

  }

 