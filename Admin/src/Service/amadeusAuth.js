const Amadeus = require('amadeus');
const amadeus = new Amadeus({
      clientId: process.env.clientId,
      clientSecret: process.env.clientSecret
    });

module.exports=amadeus