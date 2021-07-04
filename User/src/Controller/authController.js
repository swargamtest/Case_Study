const User=require('../database/Models/User')
const Ticket=require('../database/db/ticketinfo')
const amadeus=require('../Service/amadeusAuth')
const axios=require('axios')

module.exports.homepage = (req, res) => {
    res.send('Signup/Login');
  }

module.exports.signup_get = (req, res) => {

    res.send('signup');
  }
  
  module.exports.login_get = (req, res) => {
    res.send('login');
  }
  
  module.exports.signup_post = async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
  }
  
  module.exports.login_post = async (req, res) => {
    try {
      const user = await User.findByCredentials(req.body.email, req.body.password)
      const token = await user.generateAuthToken()
      res.send({ user, token })
  } catch (e) {
      res.status(400).send(e.message)
  }
  }

  module.exports.userMe_get = async (req, res) => {
    res.send(req.user)
  }
  module.exports.updateMe_patch = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
  }

  module.exports.deleteMe_delete = async (req, res) => {
    try {
      await req.user.remove()
      res.send(req.user)
  } catch (e) {
      res.status(500).send()
  }
  }

  module.exports.deleteMe_delete = async (req, res) => {
    try {
      await req.user.remove()
      res.send(req.user)
  } catch (e) {
      res.status(500).send()
  }
  }

  module.exports.logout_post = async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter((token) => {
          return token.token !== req.token
      })
      await req.user.save()

      res.send()
  } catch (e) {
      res.status(500).send()
  }
  }
  module.exports.logoutall_post = async (req, res) => {
    try {
      req.user.tokens = []
      await req.user.save()
      res.send()
  } catch (e) {
      res.status(500).send()
  }
  }

  module.exports.userTicket = (req, res) => {
    // res.send(req.user)
    axios({
      method: 'get',
      url: `http://localhost:7003/checkin?ticketId=${req.params.id}`,
      headers: {}
    }).then((response)=>
    {
      res.send(response.data)
    })
    .catch((error)=>
    {
      res.status(400).send(error)
    })
    
  }

  module.exports.userAllTicket = (req, res) => {
    // res.send(req.user.email)
    axios({
      method: 'post',
      url: `http://localhost:7003/userallticket`,
      headers: {},
      data: {
        email: req.user.email
      }
    }).then((response)=>
    {
      res.send(response.data)
    })
    .catch((error)=>
    {
      res.status(400).send(error)
    })
    
  }
  module.exports.deleteTicket =async (req, res) => {
    try {
      const deleteTicket = await amadeus.booking.flightOrder(req.body.ticketId).delete()
      const user=await Ticket.deleteOne(req.body)
      console.log(user)
      if(user.deletedCount===1)
      {
        res.status(200).send(`Your ticket with reference ID ${req.body.ticketId} has been cancelled`)
      }
      else
      {
        res.status(404).send('No ticket Found')
      }
      
    } catch (error) {
       res.status(404).send(error)
       console.log(error)
    }
  }