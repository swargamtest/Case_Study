const { Router } = require('express');
const controller=require('../controller/controller')
const authController=require('../controller/authController')
const auth=require('../middleware/auth')

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.1', // YOU NEED THIS
      info: {
        title: 'Admin API',
        version: '1.0.0',
        description: 'Admin making request'
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
    apis: ['./Admin/src/Service/router.js'],
  };


const router = Router();

/**
  * @swagger
  * tags:
  *   name: AdminUser
  *   description: The Admin Managing API
*/

/**
  * @swagger
  * tags:
  *   name: AdminF
  *   description: The Admin Managing API
*/

//Swagger component
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         
 *       properties:
 *         name:
 *           type: string
 *           description: The name of user
 *         email:
 *           type: string
 *           description: email of the user
 *         password:
 *           type: string
 *           description: password of user
 *       example:
 *         name: Swargam Hazarika
 *         email: swargam2009@gmail.com
 *         password: swargam123
 */





//Admin fucntionality
router.get('/',controller.homepage)

/**
 * @swagger
 * /addairport:
 *  post:
 *    summary: Admin adds a airport.
 *    tags: [AdminF]
 *    requestBody: 
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *                 type: object
 *                 example:
 *                   cityname: MUMBAI
 *                   iataCode: BOM
 *                   detailedName: MUMBAI/MH/IN:CHHATRAPATI S MAH
 *                  
 *                
 *    responses:
 *      '201':
 *        description: A successful response
 */
router.post('/addairport',auth,controller.addAirport)



/**
 * @swagger
 * /addflightoffers:
 *  post:
 *    summary: Admin adds best flight offers.
 *    tags: [AdminF]
 *    requestBody: 
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *                 type: object
 *                 example:
 *                   departure: 2021-08-011
 *                   arrival: 2021-10-271
 *                   data: []
 *                  
 *                
 *    responses:
 *      '201':
 *        description: A successful response
 */
router.post('/addflightoffers',auth,controller.flightPriceoffers)

/**
 * @swagger
 * /citySearch:
 *  get:
 *    summary: Serches a City airport
 *    tags: [AdminF]
 *    parameters:
 *      - in: query
 *        name: keyword
 *        schema: 
 *          type: string
 *                
 *    responses:
 *      '201':
 *        description: A successful response
 */
router.get(`/citySearch`,auth,controller.citySerch)


/**
 * @swagger
 * /date:
 *  post:
 *    summary: Admin Serches for flight offers
 *    tags: [AdminF]
 *    requestBody: 
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *                 type: object
 *                 example:
 *                   departure: 2021-08-01
 *                   arrival: 2021-10-27
 *                   locationDeparture: GAU
 *                   locationArrival: BOM
 *                  
 *                
 *    responses:
 *      '201':
 *        description: A successful response
 */
router.post('/date',auth,controller.date)


// router.post('/flightprice',controller.flightPrice)
router.post('/flightCreateOrder',controller.flightOrder)

/**
 * @swagger
 * /ticketinfo:
 *  get:
 *    tags: [AdminF]
 *    description: Returns ALL TICKET
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/ticketinfo',auth,controller.getTicketInfo)


/**
 * @swagger
 * /deleteticket:
 *  delete:
 *    summary: Delete a ticket.
 *    tags: [AdminF]
 *    requestBody: 
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                    ticketId:
 *                       type:string
 *                 example:
 *                   ticketId: eJzTd9cPibQwDvEGAAtSAl0%3D
 *                  
 *                
 *    responses:
 *      '201':
 *        description: A successful response
 */
router.delete('/deleteticket',auth,controller.deleteTicket)


//Admin singup/login
router.get('/signup', authController.signup_get);
router.get('/adminLogin', authController.login_get);

/**
 * @swagger
 * /signup:
 *  post:
 *    summary: Creates a admin.
 *    tags: [AdminUser]
 *    requestBody: 
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *                 $ref: '#/components/schemas/User'
 *                
 *    responses:
 *      '201':
 *        description: A successful response
 */
router.post('/signup', authController.signup_post);
/**
 * @swagger
 * /adminLogin:
 *  post:
 *    summary: Login  a admin.
 *    tags: [AdminUser]
 *    requestBody: 
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *                 $ref: '#/components/schemas/User'
 *                
 *    responses:
 *      '201':
 *        description: A successful response
 */
router.post('/adminLogin', authController.login_post);

/**
 * @swagger
 * /adminprofile:
 *  get:
 *    tags: [AdminUser]
 *    description: Returns admin data
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *            appication/json:
 *                schema:
 *                   $ref:'#/components/schemas/User'
 */
router.get('/adminprofile',auth, authController.userMe_get);
router.post('/adminlogoutall',auth, authController.logoutall_post);



const swaggerDocs = swaggerJsDoc(swaggerOptions);
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports=router