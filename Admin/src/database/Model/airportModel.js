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




airportSchema.statics.cityName = async (cityname) => {
    const user = await Tick.find({ cityname })

    if (!user) {
        throw new Error('Airports will be added soon for your place')
    }

    
    return user
}



// const Airport = mongoose.model('Airport', airportSchema)

module.exports = airportSchema