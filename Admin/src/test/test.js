const mongoose = require("mongoose");

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
const object1= {
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
}
describe('Admin', () => {

    //Checking If Tesing is connected or not
    describe('/GET testing', () => {
        it('Checking if it cinnects', (done) => {
          chai.request(server)
              .get('/')
              .end((err, res) => {
                    res.should.have.status(200);
                done();
              });
        });
    });
    describe('/GET List of airports', () => {
        it('Get list of Flight based on location', (done) => {
          chai.request(server)
              .get('/citySearch?keyword=GAU')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                done();
              });
        });
    });
    describe('/GET List of flight deals', () => {
        it('Get cheap flight deals list', (done) => {
          chai.request(server)
              .post('/date')
              .send(userDeparture)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    console.log(res.data)
                done();
              });
        });
    });
    describe('/GET List of airports', () => {
        it('Get list of Flight based on location', (done) => {
          chai.request(server)
              .post('/flightprice')
              .send(object1)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                done();
              });
        });
    });
    describe('/GET List of airports', () => {
        it('Get list of Flight based on location', (done) => {
          chai.request(server)
              .post('/flightCreateOrder')
              .send(object1)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                done();
              });
        });
    });







})

