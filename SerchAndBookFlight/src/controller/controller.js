const FlightOffers=require('../database/db/flightOffer')
const client=require('../Service/twilio')
const amadeus=require('../Service/amadeusAuth')
const Ticket=require('../database/db/ticketinfo')


module.exports.getflightOffers =async (req, res) => {
  try {
    const offers = await FlightOffers.findByDates(req.body.departureDate,req.body.arrivalDate)
    res.status(200).send({ offers})
} catch (e) {
    res.status(400).send(e.message)
}
}

module.exports.deletedata =async (req, res) => {
  try {
    const offers = await FlightOffers.findByoffers(req.body.offer)
    offers.offers=offers.offers.filter((offer) => {
      return offer.id !== req.body.offer.id
  })
    await offers.save()
    let inputFlightCreateOrder = req.body.offer;
    let fristName=req.body.fname
    let lastName=req.body.lname
    let number=req.body.number
    let email=req.body.email

  // console.log(req.body)
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
      // console.log(response.result.data.id);
      // console.log(response.result.data.travelers[0].name.firstName);
      // console.log(response.result.data.travelers[0].contact.phones[0].number);
      // console.log(response.result.data.travelers[0].contact.emailAddress);
           
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
  
} catch (e) {
    res.status(400).send(e.message)
}
}

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

  