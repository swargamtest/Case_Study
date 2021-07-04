let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();


chai.use(chaiHttp);

let object1=
{
    departureDate:"2021-08-01",
    arrivalDate:"2021-10-27"
}
let object2=
    {
        offer: {
                    "type": "flight-offer",
                    "id": "3",
                    "source": "GDS",
                    "instantTicketingRequired": false,
                    "nonHomogeneous": false,
                    "oneWay": false,
                    "lastTicketingDate": "2021-07-17",
                    "numberOfBookableSeats": 9,
                    "itineraries": [
                        {
                            "duration": "PT17H25M",
                            "segments": [
                                {
                                    "departure": {
                                        "iataCode": "GAU",
                                        "at": "2021-08-01T19:30:00"
                                    },
                                    "arrival": {
                                        "iataCode": "DEL",
                                        "terminal": "3",
                                        "at": "2021-08-01T22:15:00"
                                    },
                                    "carrierCode": "AI",
                                    "number": "892",
                                    "aircraft": {
                                        "code": "319"
                                    },
                                    "operating": {
                                        "carrierCode": "AI"
                                    },
                                    "duration": "PT2H45M",
                                    "id": "27",
                                    "numberOfStops": 0,
                                    "blacklistedInEU": false
                                },
                                {
                                    "departure": {
                                        "iataCode": "DEL",
                                        "terminal": "3",
                                        "at": "2021-08-02T10:40:00"
                                    },
                                    "arrival": {
                                        "iataCode": "BOM",
                                        "terminal": "2",
                                        "at": "2021-08-02T12:55:00"
                                    },
                                    "carrierCode": "AI",
                                    "number": "865",
                                    "aircraft": {
                                        "code": "321"
                                    },
                                    "operating": {
                                        "carrierCode": "AI"
                                    },
                                    "duration": "PT2H15M",
                                    "id": "28",
                                    "numberOfStops": 0,
                                    "blacklistedInEU": false
                                }
                            ]
                        }
                    ],
                    "price": {
                        "currency": "EUR",
                        "total": "59.45",
                        "base": "48.00",
                        "fees": [
                            {
                                "amount": "0.00",
                                "type": "SUPPLIER"
                            },
                            {
                                "amount": "0.00",
                                "type": "TICKETING"
                            }
                        ],
                        "grandTotal": "59.45"
                    },
                    "pricingOptions": {
                        "fareType": [
                            "PUBLISHED"
                        ],
                        "includedCheckedBagsOnly": true
                    },
                    "validatingAirlineCodes": [
                        "AI"
                    ],
                    "travelerPricings": [
                        {
                            "travelerId": "1",
                            "fareOption": "STANDARD",
                            "travelerType": "ADULT",
                            "price": {
                                "currency": "EUR",
                                "total": "59.45",
                                "base": "48.00"
                            },
                            "fareDetailsBySegment": [
                                {
                                    "segmentId": "27",
                                    "cabin": "ECONOMY",
                                    "fareBasis": "SAP15",
                                    "class": "S",
                                    "includedCheckedBags": {
                                        "weight": 25,
                                        "weightUnit": "KG"
                                    }
                                },
                                {
                                    "segmentId": "28",
                                    "cabin": "ECONOMY",
                                    "fareBasis": "SAP15",
                                    "class": "S",
                                    "includedCheckedBags": {
                                        "weight": 25,
                                        "weightUnit": "KG"
                                    }
                                }
                            ]
                        }
                    ]
                },
        fname:"swargam",
        lname:"hazarika",
        email:"swargam2009@gmail.com",
        number:"9987115275"
    
    }
//Our parent block
describe('SNB', () => {
    // before((done) => { //Before each test we empty the database
    //     Airport.remove({}, (err) => {
    //        done();
    //     });
    // });
  
  describe('/post flightoffer', () => {
      it('it should get the flight offer', (done) => {
        chai.request(server)
            .post('/flightoffers')
            .send(object1)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('offers');
                  done();
            });
      });
  });
  describe('/Get ticket via email', () => {
    it('it should get details of ticket by email', (done) => {
      chai.request(server)
          .post('/Deletedata')
          .send(object2)
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    });
});

  //Signup user
//   describe('/POST Noairport', () => {
//     it('it should show 404 when there is no airport', (done) => {
//       chai.request(server)
//           .post('/airportSerch')
//           .send(airport1)
//           .end((err, res) => {
//                 res.should.have.status(404);
//             done();
//           });
//     });

// });

   
  
  

});