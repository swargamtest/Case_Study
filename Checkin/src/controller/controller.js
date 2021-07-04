const amadeus=require('../Service/amadeusAuth')
const Ticket=require('../database/db/ticketinfo')


module.exports.homepage = (req, res) => {
    res.send('testing');
  }

module.exports.checkinUser = async (req, res) => { 
  try {

    const ticket= await  amadeus.booking.flightOrder(req.query.ticketId).get()
    console.log(ticket)
    res.status(200).send(ticket.result.data)
  } catch (error) 
  {
    res.status(400).send('No tickets found,go book ticket and come back here again!!!')
  }
   
 }

 module.exports.allticket = async (req, res) => { 
  try {

    const ticket = await Ticket.findByEmail(req.body.email)
    if(ticket.length===0)
    {
      res.status(404).send('No tickets found,go book ticket and come back here again!!!')
      return 
    }
      res.status(200).send({ ticket })
  } catch (error) 
  {
    res.status(400).send(error)
  }
   
 }

