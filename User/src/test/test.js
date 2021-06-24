const mongoose = require("mongoose");
const User = require('../database/Models/User');
const jwt = require('jsonwebtoken')

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();


chai.use(chaiHttp);
const userOneId = new mongoose.Types.ObjectId()
const userOne = {
_id: userOneId,
name: 'Rajib hazarika',
email: 'rajib@example.com',
password: 'rajib123',
tokens: [{
token: jwt.sign({ _id: userOneId }, process.env.JWT_TOKEN)
}]
}
//Our parent block
describe('User', () => {
    before((done) => { //Before each test we empty the database
        User.remove({}, (err) => {
           done();
        });
    });
  
//Get use
  describe('/GET UserSignup', () => {
      it('it should get signup page', (done) => {
        chai.request(server)
            .get('/signup')
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });
  });
  
  //Signup user
  describe('/POST SignupUser', () => {
    it('it should signup user', (done) => {
      chai.request(server)
          .post('/signup')
          .send(userOne)
          .end((err, res) => {
                res.should.have.status(201);
            done();
          });
    });

});
  //Error Signup Page
    describe('/POST SignupUser', () => {
        it('it should not signup same user', (done) => {
        chai.request(server)
            .post('/signup')
            .send(userOne)
            .end((err, res) => {
                    res.should.have.status(400);
                done();
            });
        });

    });
    //Login user
    describe('/POST LoginUser', () => {
        it('it should login user', (done) => {
        chai.request(server)
            .post('/userLogin')
            .send(
                {
                    email:userOne.email,
                    password:userOne.password
                })
            .end((err, res) => {
                    res.should.have.status(200);
                done();
            });
        });

    });
    //Error login
    describe('/POST LoginUser', () => {
        it('it should login user', (done) => {
            let user = {
                email:"mridu@gmail.com.com",
                password:"mridu1236"
            }
        chai.request(server)
            .post('/userLogin')
            .send(user)
            .end((err, res) => {
                    res.should.have.status(400);
                done();
            });
        });

    });
    //Get user
    describe('/get LoginUser data', () => {
        it('it should give us login user data with auth', (done) => {
        chai.request(server)
            .get('/users/me')
            // .set({ "Authorization": `Bearer ${token}` })
            .set({"Authorization": `Bearer ${userOne.tokens[0].token}`})
            // .send(user)
            .end((err, res) => {
                    res.should.have.status(200);
                done();
            });
        });

    });
    describe('/patch updateUser data', () => {
        it('it should update  user data with auth', (done) => {
        chai.request(server)
            .patch('/users/me')
            // .set({ "Authorization": `Bearer ${token}` })
            .set({"Authorization": `Bearer ${userOne.tokens[0].token}`})
            .send({email:'rajib1968@gmail.com'})
            .end((err, res) => {
                    res.should.have.status(200);
                done();
            });
        });

    });
    describe('/ delete User data', () => {
        it('it should Delete the user data auth', (done) => {
        chai.request(server)
            .delete('/users/me')
            // .set({ "Authorization": `Bearer ${token}` })
            .set({"Authorization": `Bearer ${userOne.tokens[0].token}`})
            // .send(user)
            .end((err, res) => {
                    res.should.have.status(200);
                done();
            });
        });

    });
    // describe('/LogOut User', () => {
    //     it('it should logout user with auth', (done) => {
    //     chai.request(server)
    //         .post('/logout')
    //         // .set({ "Authorization": `Bearer ${token}` })
    //         .set({"Authorization": `Bearer ${userOne.tokens[0].token}`})
    //         // .send(user)
    //         .end((err, res) => {
    //                 res.should.have.status(200);
    //             done();
    //         });
    //     });

    // });

});