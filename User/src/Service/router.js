const { Router } = require('express');
const authController = require('../Controller/authController');
const auth=require('../middleware/auth')

//SWAGGER CONFIGURATION
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.1', // YOU NEED THIS
      info: {
        title: 'Client API',
        version: '1.0.0',
        description: 'Client making request'
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
    apis: ['./User/src/Service/router.js'],
  };

//Setting up routers
const router = Router();
router.get('/', authController.homepage);

/**
  * @swagger
  * tags:
  *   name: User
  *   description: The Client Managing API
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

/**
 * @swagger
 * /signup:
 *  get:
 *    tags: [User]
 *    description: Use to request Signup page   
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/signup', authController.signup_get);


/**
 * @swagger
 * /userLogin:
 *  get:
 *    tags: [User]
 *    description: Use to request login page  
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/userLogin', authController.login_get);


/**
 * @swagger
 * /signup:
 *  post:
 *    summary: Creates a user.
 *    tags: [User]
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
 * /userLogin:
 *  post:
 *    summary: Login  a user.
 *    tags: [User]
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
router.post('/userLogin', authController.login_post);

/**
 * @swagger
 * /users/me:
 *  get:
 *    tags: [User]
 *    description: Returns User data 
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *            appication/json:
 *                schema:
 *                   $ref:'#/components/schemas/User'
 */
 router.get('/users/me',auth, authController.userMe_get);

/**
 * @swagger
 * /users/me:
 *  patch:
 *    summary: update a user.
 *    tags: [User]
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
 router.patch('/users/me',auth, authController.updateMe_patch);


 /**
 * @swagger
 * /users/me:
 *  delete:
 *    tags: [User]
 *    description: Deletes thr User
 *    responses:
 *      '200':
 *        description: A successful response
 *        content:
 *            appication/json:
 *                schema:
 *                   type: object
 *                   properties:
 *                          name:
 *                             type:string
 */
router.delete('/users/me',auth, authController.deleteMe_delete);


/**
 * @swagger
 * /users/ticket/{ticketId}:
 *  get:
 *    summary: Serches a Checkin ticket.
 *    tags: [User]
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
router.get('/users/ticket/:id',auth, authController.userTicket);


/**
 * @swagger
 * /users/allticket:
 *  get:
 *    summary: Serches user all ticket via email.
 *    tags: [User]                
 *    responses:
 *      '201':
 *        description: A successful response
 */
router.get('/users/allticket',auth, authController.userAllTicket);


/**
 * @swagger
 * /users/deleteticket:
 *  delete:
 *    summary: Delete a ticket.
 *    tags: [User]
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
router.delete('/users/deleteticket',auth, authController.deleteTicket);




router.post('/logout', auth,authController.logout_post);
router.post('/logoutall',auth, authController.logoutall_post);


const swaggerDocs = swaggerJsDoc(swaggerOptions);
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = router;