const { Router } = require('express');
const controller=require('../controller/controller')

const router = Router();

router.get('/',controller.homepage)
router.get(`/citySearch`,controller.citySerch)
router.post('/date',controller.date)
router.post('/flightprice',controller.flightPrice)
router.post('/flightCreateOrder',controller.flightOrder)
router.get('/ticketinfo',controller.getTicketInfo)
router.delete('/deleteticket',controller.deleteTicket)
router.get('/singleTicketInfo',controller.singleTicketInfo)


module.exports=router