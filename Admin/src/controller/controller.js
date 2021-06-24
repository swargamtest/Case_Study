const amadeus=require('../Service/amadeusAuth')

module.exports.homepage = (req, res) => {
    res.send('testing');
  }

module.exports.citySerch = async (req, res) => { 
    console.log(req.query); 
    var keywords = req.query.keyword; 
    const response = await amadeus.referenceData.locations 
      .get({ 
        keyword: keywords, 
        subType: "CITY,AIRPORT", 
      }) 
      .catch((x) => console.log(x)); 
    try { 
      await res.json(JSON.parse(response.body)); 
    } catch (err) { 
      await res.json(err); 
    } 
  }

module.exports.date = async function (req, res) { 
    console.log(req.body); 
    departure = req.body.departure; 
    arrival = req.body.arrival; 
    locationDeparture = req.body.locationDeparture; 
    locationArrival = req.body.locationArrival; 
    const response = await amadeus.shopping.flightOffersSearch 
      .get({ 
        originLocationCode: locationDeparture, 
        destinationLocationCode: locationArrival, 
        departureDate: departure, 
        adults: "1", 
      }) 
      .catch((err) => console.log(err)); 
    try { 
      await res.json(JSON.parse(response.body)); 
    } catch (err) { 
      await res.json(err); 
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
    let inputFlightCreateOrder = req.body;
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
          "dateOfBirth": "2012-10-11",
          "gender": "FEMALE",
          "contact": {
            "emailAddress": "jorge.gonzales833@telefonica.es",
            "phones": [
              {
                "deviceType": "MOBILE",
                "countryCallingCode": "34",
                "number": "480080076"
              }
            ]
          },
          "name": {
            "firstName": "ADRIANA",
            "lastName": "GONZALES"
          }
        }
      ]
    }
  })
      ).then(function(response){
      console.log(response.result);
      res.json(response.result)
  }).catch(function(responseError){
      console.log(responseError);
      
  });
  }