const { Router } = require('express');
const controller=require('../controller/controller')

const router = Router();

router.get('/',controller.homepage)
router.get(`/citySearch`,controller.citySerch)
router.post('/date',controller.date)
router.post('/flightprice',controller.flightPrice)
router.post('/flightCreateOrder',controller.flightOrder)

module.exports=router