const mongoose = require('mongoose')

const airportSchema = new mongoose.Schema({
    cityname: {
        type: String,
        required: true,
        trim: true
    },
    iataCode: {
        type: String,
        required: true,
        trim: true
    },
    detailedName: {
        type: String,
        required: true,
        trim: true,
        unique:true
    }
})








// const Airport = mongoose.model('Airport', airportSchema)

module.exports = airportSchema