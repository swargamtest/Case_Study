const mongoose = require('mongoose')

const offerSchema = new mongoose.Schema({
    departureDate: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    arrivalDate: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    offers: {
         type : Array , 
         "default" : [] 
    }
})






module.exports = offerSchema