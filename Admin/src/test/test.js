const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const User=require('../database/db/adminDb')

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);
const userDeparture=
{
    departure:"2021-08-01",
    arrival:"2021-10-27",
    locationDeparture:"GAU",
    locationArrival:"BOM"
}
const airportData=
{
    
        cityname:"testcity",
        iataCode:"testcode",
        detailedName:"testdetailname"
    
}
const flightoffers=
{
    "departure":"testing1",
    "arrival":"testing1",
    "data":[
        {
        "type": "flight-offer",
        "id": "1",
        "source": "GDS",
        "instantTicketingRequired": false,
        "nonHomogeneous": false,
        "oneWay": false,
        "lastTicketingDate": "2021-07-17",
        "numberOfBookableSeats": 9,
        "itineraries": [
            {
                "duration": "PT26H",
                "segments": [
                    {
                        "departure": {
                            "iataCode": "GAU",
                            "at": "2021-08-01T11:40:00"
                        },
                        "arrival": {
                            "iataCode": "CCU",
                            "terminal": "2",
                            "at": "2021-08-01T13:00:00"
                        },
                        "carrierCode": "AI",
                        "number": "730",
                        "aircraft": {
                            "code": "319"
                        },
                        "operating": {
                            "carrierCode": "AI"
                        },
                        "duration": "PT1H20M",
                        "id": "5",
                        "numberOfStops": 0,
                        "blacklistedInEU": false
                    },
                    {
                        "departure": {
                            "iataCode": "CCU",
                            "terminal": "2",
                            "at": "2021-08-02T10:55:00"
                        },
                        "arrival": {
                            "iataCode": "BOM",
                            "terminal": "2",
                            "at": "2021-08-02T13:40:00"
                        },
                        "carrierCode": "AI",
                        "number": "676",
                        "aircraft": {
                            "code": "32A"
                        },
                        "operating": {
                            "carrierCode": "AI"
                        },
                        "duration": "PT2H45M",
                        "id": "6",
                        "numberOfStops": 0,
                        "blacklistedInEU": false
                    }
                ]
            }
        ],
        "price": {
            "currency": "EUR",
            "total": "55.45",
            "base": "44.00",
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
            "grandTotal": "55.45"
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
                    "total": "55.45",
                    "base": "44.00"
                },
                "fareDetailsBySegment": [
                    {
                        "segmentId": "5",
                        "cabin": "ECONOMY",
                        "fareBasis": "SAP15",
                        "class": "S",
                        "includedCheckedBags": {
                            "weight": 25,
                            "weightUnit": "KG"
                        }
                    },
                    {
                        "segmentId": "6",
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
    }
]
}
const userOneId = new mongoose.Types.ObjectId()
const userOne = {
_id: userOneId,
name: 'Rajib hazarika',
email: 'rajib@example.com',
password: 'rajib123',
tokens: [{
token: jwt.sign({ _id: userOneId }, process.env.JWT_TOKEN)
}]
}
const object1=  {
    "order":{
           "type": "flight-offer",
           "id": "2",
           "source": "GDS",
           "instantTicketingRequired": false,
           "nonHomogeneous": false,
           "oneWay": false,
           "lastTicketingDate": "2021-07-17",
           "numberOfBookableSeats": 9,
           "itineraries": [
               {
                   "duration": "PT13H30M",
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
                           "id": "38",
                           "numberOfStops": 0,
                           "blacklistedInEU": false
                       },
                       {
                           "departure": {
                               "iataCode": "DEL",
                               "terminal": "3",
                               "at": "2021-08-02T06:50:00"
                           },
                           "arrival": {
                               "iataCode": "BOM",
                               "terminal": "2",
                               "at": "2021-08-02T09:00:00"
                           },
                           "carrierCode": "AI",
                           "number": "887",
                           "aircraft": {
                               "code": "321"
                           },
                           "operating": {
                               "carrierCode": "AI"
                           },
                           "duration": "PT2H10M",
                           "id": "39",
                           "numberOfStops": 0,
                           "blacklistedInEU": false
                       }
                   ]
               }
           ],
           "price": {
               "currency": "EUR",
               "total": "67.46",
               "base": "56.00",
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
               "grandTotal": "67.46"
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
                       "total": "67.46",
                       "base": "56.00"
                   },
                   "fareDetailsBySegment": [
                       {
                           "segmentId": "38",
                           "cabin": "ECONOMY",
                           "fareBasis": "SAP15",
                           "class": "S",
                           "includedCheckedBags": {
                               "weight": 25,
                               "weightUnit": "KG"
                           }
                       },
                       {
                           "segmentId": "39",
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
       "fname":"swargam",
       "lname":"hazarika",
       "email":"swargam2009@gmail.com",
       "number":"8779745376"
       

}
describe('Admin', () => {
    before((done) => { //Before each test we empty the database
        User.remove({}, (err) => {
           done();
        });
    });
    //Checking If Tesing is connected or not
    describe('/GET testing', () => {
        it('Checking if it connects', (done) => {
          chai.request(server)
              .get('/')
              .end((err, res) => {
                    res.should.have.status(200);
                done();
              });
        });
    });
    describe('/POST SignupUser', () => {
        it('it should signup admin', (done) => {
          chai.request(server)
              .post('/signup')
              .send(userOne)
              .end((err, res) => {
                    res.should.have.status(201);
                done();
              });
        });
    
    });
    describe('/GET List of airports', () => {
        it('Get list of Flight based on location', (done) => {
          chai.request(server)
              .get('/citySearch?keyword=GAU')
              .set({"Authorization": `Bearer ${userOne.tokens[0].token}`})
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                done();
              });
        });
    });
    describe('/POST Added airport by admin', () => {
        it('Add airport to database', (done) => {
          chai.request(server)
              .post('/addairport')
              .set({"Authorization": `Bearer ${userOne.tokens[0].token}`})
              .send(airportData)
              .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    console.log(res.data)
                done();
              });
        });
    });
    describe('/GET List of ticket', () => {
        it('Get list of ticket of all passenger', (done) => {
          chai.request(server)
              .get('/ticketinfo')
              .set({"Authorization": `Bearer ${userOne.tokens[0].token}`})
              .end((err, res) => {
                    res.should.have.status(404);
                    res.text.should.be.eq("No ticket at all");
                done();
              });
        });
    });
    describe('/GET List of airports', () => {
        it('Get list of Flight based on location and confirm flight price', (done) => {
          chai.request(server)
              .post('/date')
              .set({"Authorization": `Bearer ${userOne.tokens[0].token}`})
              .send(userDeparture)
              .end((err, res) => {
                    res.should.have.status(200);
                done();
              });
        });
    });
    describe('/post flight offers', () => {
        it('post flight offers', (done) => {
          chai.request(server)
              .post('/addflightoffers')
              .set({"Authorization": `Bearer ${userOne.tokens[0].token}`})
              .send(flightoffers)
              .end((err, res) => {
                    res.should.have.status(201);
                done();
              });
        });
    });
    describe('/POST LoginAdmin', () => {
        it('it should login uadmin', (done) => {
            let user = {
                email:"raji1b@example.com",
                password:"rajib123"
            }
        chai.request(server)
            .post('/adminLogin')
            .send(user)
            .end((err, res) => {
                    res.should.have.status(400);
                done();
            });
        });

    });
    describe('/get LoginAdmin user data', () => {
        it('it should give us login admin data with auth', (done) => {
        chai.request(server)
            .get('/adminprofile')
            // .set({ "Authorization": `Bearer ${token}` })
            .set({"Authorization": `Bearer ${userOne.tokens[0].token}`})
            // .send(user)
            .end((err, res) => {
                    res.should.have.status(200);
                done();
            });
        });

    });






})

