const { Router } = require('express');
const controller=require('../controller/controller')

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.1', // YOU NEED THIS
      info: {
        title: 'Airport API',
        version: '1.0.0',
        description: 'Client making  airport request'
      },
      basePath: '/',
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          }
        }
      },
      security: [{
        bearerAuth: []
      }]
    },
    apis: ['./SerchAndBookFlight/src/Service/router.js'],
  };



const router = Router();


/**
  * @swagger
  * tags:
  *   name: SNB
  *   description: SNB Api
*/



/**
 * @swagger
 * /flightoffers:
 *  post:
 *    summary: Serches Flight offer on particular date.
 *    tags: [SNB]
 *    requestBody: 
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                    departureDate:
 *                       type:string
 *                    arrivalDate:
 *                       type:string
 *                 example:
 *                    departureDate: 2021-08-01
 *                    arrivalDate: 2021-10-27
 *                  
 *                
 *    responses:
 *      '201':
 *        description: A successful response
 */
router.post('/flightoffers',controller.getflightOffers)



/**
 * @swagger
 * /Deletedata:
 *  post:
 *    summary: Book flight offers by client.
 *    tags: [SNB]
 *    requestBody: 
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *                 type: object
 *                 example:
 *                    offer:
 *                      type: flight-offer
 *                      id: '3'
 *                      source: GDS
 *                      instantTicketingRequired: false
 *                      nonHomogeneous: false
 *                      oneWay: false           
 *                      lastTicketingDate: '2021-07-17'
 *                      numberOfBookableSeats: 9
 *                      itineraries:
 *                      - duration: PT17H25M
 *                        segments:
 *                        - departure:
 *                            iataCode: GAU
 *                            at: '2021-08-01T19:30:00'
 *                          arrival:
 *                            iataCode: DEL
 *                            terminal: '3'
 *                            at: '2021-08-01T22:15:00'
 *                          carrierCode: AI
 *                          number: '892'
 *                          aircraft:
 *                            code: '319'
 *                          operating:
 *                            carrierCode: AI
 *                          duration: PT2H45M
 *                          id: '27'
 *                          numberOfStops: 0
 *                          blacklistedInEU: false
 *                        - departure:
 *                            iataCode: DEL
 *                            terminal: '3'
 *                            at: '2021-08-02T10:40:00'
 *                          arrival:
 *                            iataCode: BOM
 *                            terminal: '2'
 *                            at: '2021-08-02T12:55:00'
 *                          carrierCode: AI
 *                          number: '865'
 *                          aircraft:
 *                            code: '321'
 *                          operating:
 *                            carrierCode: AI
 *                          duration: PT2H15M
 *                          id: '28'
 *                          numberOfStops: 0
 *                          blacklistedInEU: false
 *                      price:
 *                        currency: EUR
 *                        total: '59.45'
 *                        base: '48.00'
 *                        fees:
 *                        - amount: '0.00'
 *                          type: SUPPLIER
 *                        - amount: '0.00'
 *                          type: TICKETING
 *                        grandTotal: '59.45'
 *                      pricingOptions:
 *                        fareType:
 *                        - PUBLISHED
 *                        includedCheckedBagsOnly: true
 *                      validatingAirlineCodes:
 *                      - AI
 *                      travelerPricings:
 *                      - travelerId: '1'
 *                        fareOption: STANDARD
 *                        travelerType: ADULT
 *                        price:
 *                          currency: EUR
 *                          total: '59.45'
 *                          base: '48.00'
 *                        fareDetailsBySegment:
 *                        - segmentId: '27'
 *                          cabin: ECONOMY
 *                          fareBasis: SAP15
 *                          class: S
 *                          includedCheckedBags:
 *                            weight: 25
 *                            weightUnit: KG
 *                        - segmentId: '28'
 *                          cabin: ECONOMY
 *                          fareBasis: SAP15
 *                          class: S
 *                          includedCheckedBags:
 *                            weight: 25
 *                            weightUnit: KG
 *                    fname: swargam
 *                    lname: hazarika
 *                    email: swargam2009@gmail.com
 *                    number: '9987115275'
 *                  
 *                
 *    responses:
 *      '201':
 *        description: A successful response
 */
router.post('/Deletedata',controller.deletedata)


const swaggerDocs = swaggerJsDoc(swaggerOptions);
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


module.exports=router