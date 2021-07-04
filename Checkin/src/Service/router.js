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
    apis: ['./Checkin/src/Service/router.js'],
  };

const router = Router();
router.get('/',controller.homepage)



/**
  * @swagger
  * tags:
  *   name: Checkin
  *   description: Checkin Api
*/



/**
 * @swagger
 * /checkin:
 *  get:
 *    summary: Serches a Checkin ticket.
 *    tags: [Checkin]
 *    parameters:
 *      - in: query
 *        name: ticketId
 *        schema: 
 *          type: string
 *                
 *    responses:
 *      '201':
 *        description: A successful response
 */
router.get('/checkin',controller.checkinUser)



/**
 * @swagger
 * /userallticket:
 *  post:
 *    summary: Serches a ticket based on email.
 *    tags: [Checkin]
 *    requestBody: 
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                    email:
 *                       type:string
 *                 example:
 *                   email: swargam2009@gmail.com
 *                  
 *                
 *    responses:
 *      '201':
 *        description: A successful response
 */
router.post('/userallticket',controller.allticket)


const swaggerDocs = swaggerJsDoc(swaggerOptions);
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
module.exports=router