const mongoose = require('mongoose')
const validator = require('validator')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const Task = require('./task')

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




ticketSchema.statics.findByEmail = async (email) => {
    const user = await Ticket.find({ email })

    if (!user) {
        throw new Error('Unable to find any booked ticket')
    }

    
    return user
}



const Ticket = mongoose.model('Ticket', ticketSchema)

module.exports = Ticket