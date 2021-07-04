const { Router } = require('express');
const controller=require('../controller/controller')


//SWAGGER CONFIGURATION
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
    apis: ['./AirportSerch/src/Service/router.js'],
  };

const router = Router();


/**
  * @swagger
  * tags:
  *   name: Airport
  *   description: Airport Api
*/

//Swagger component
/**
 * @swagger
 * components:
 *   schemas:
 *     Airport:
 *       type: object
 *       required:
 *         - cityname     
 *       properties:
 *         cityname:
 *           type: string
 *           description: The name of airport
 *       example:
 *         cityname: MUMBAI
 */

/**
 * @swagger
 * /airportSerch:
 *  post:
 *    summary: Serches a airport.
 *    tags: [Airport]
 *    requestBody: 
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Airport'
 *                
 *    responses:
 *      '201':
 *        description: A successful response
 */
router.post('/airportSerch',controller.getflighairport)


/**
 * @swagger
 * /iataverification:
 *  post:
 *    summary: Serches a iataCode.
 *    tags: [Airport]
 *    requestBody: 
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                    iataCode:
 *                       type:string
 *                 example:
 *                   iataCode: GAU
 *                  
 *                
 *    responses:
 *      '201':
 *        description: A successful response
 */
router.post('/iataverification',controller.getflighiata)


const swaggerDocs = swaggerJsDoc(swaggerOptions);
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports=router