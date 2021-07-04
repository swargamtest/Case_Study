const mongoose = require('mongoose')
const ticketschema=require('../Models/ticketModel')
//Connectiing to mongoose
const con1=mongoose.createConnection(`your db name`, {
 useNewUrlParser: true,
 useCreateIndex: true,
 useUnifiedTopology: true
})
con1.then(()=>{
    console.log(`connection to Ticket database established`)
  }).catch(err=>{
    console.log(`db error ${err.message}`);
    process.exit(-1)
  })
const Ticket = con1.model('Ticket', ticketschema)
module.exports=Ticket
