// const mongoose = require("mongoose");
// const Ticket=require('../database/db/ticketinfo')

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();


chai.use(chaiHttp);

let object1=
{
    email:"swargam2009@gmail.com"
}
//Our parent block
describe('Checkin', () => {
    // before((done) => { //Before each test we empty the database
    //     Airport.remove({}, (err) => {
    //        done();
    //     });
    // });
  
//Get use
  describe('/Get ticket via query', () => {
      it('it should get details of ticket', (done) => {
        chai.request(server)
            .get('/checkin')
            .query({ ticketId: 'eJzTd9cPCYpwCvICAAvXAoI%3D' })
            .end((err, res) => {
                  res.should.have.status(400);
                  res.text.should.be.eq("No tickets found,go book ticket and come back here again!!!");
                  done();
            });
      });
  });
  describe('/Get ticket via email', () => {
    it('it should get details of ticket by email', (done) => {
      chai.request(server)
          .post('/userallticket')
          .send(object1)
          .end((err, res) => {
                res.should.have.status(404);
                res.text.should.be.eq("No tickets found,go book ticket and come back here again!!!");

            done();
          });
    });
});

  //Signup user
//   describe('/POST Noairport', () => {
//     it('it should show 404 when there is no airport', (done) => {
//       chai.request(server)
//           .post('/airportSerch')
//           .send(airport1)
//           .end((err, res) => {
//                 res.should.have.status(404);
//             done();
//           });
//     });

// });

   
  
  

});