const mongoose = require("mongoose");
const Airport=require('../database/db/airport')

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();


chai.use(chaiHttp);
const userOneId = new mongoose.Types.ObjectId()
const airport = {
cityname:"MUMBAI"
}
const airport1 = {
    cityname:"jesus"
    }
//Our parent block
describe('Airport', () => {
    // before((done) => { //Before each test we empty the database
    //     Airport.remove({}, (err) => {
    //        done();
    //     });
    // });
  
//Get use
  describe('/post Airport', () => {
      it('it should get airport', (done) => {
        chai.request(server)
            .post('/airportSerch')
            .send(airport)
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });
  });
  
  //Signup user
  describe('/POST Noairport', () => {
    it('it should show 404 when there is no airport', (done) => {
      chai.request(server)
          .post('/airportSerch')
          .send(airport1)
          .end((err, res) => {
                res.should.have.status(404);
            done();
          });
    });

});
//   //Error Signup Page
//     describe('/POST SignupUser', () => {
//         it('it should not signup same user', (done) => {
//         chai.request(server)
//             .post('/signup')
//             .send(userOne)
//             .end((err, res) => {
//                     res.should.have.status(400);
//                 done();
//             });
//         });

//     });
   
   
  
  

});