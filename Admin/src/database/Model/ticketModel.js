const mongoose = require('mongoose')
const validator = require('validator')

const ticketSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    lname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        // unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    ticketId: {
        type: String,
        required: true,
        trim: true
    }
})






// const Ticket = con1.model('Ticket', ticketSchema)

module.exports = ticketSchema