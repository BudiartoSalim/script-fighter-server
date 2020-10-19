const { beforeAll, afterAll, expect } = require('@jest/globals');
const request = require('supertest');
const jwt = require('jsonwebtoken')
const { User, UserStatus } = require('../models')
// const { describe } = require('yargs');
const app = require('../app.js');
// const request = require('supertest')
let userLogin = {
  email: 'login_user@mail.com',
  password: 'login_user',
  username: 'login_user'
}
let dummyLogin = {
  email: 'login_user1@mail.com',
  password: 'login_user1',
  username: 'login_user1'
}
describe('User Routes Test', () => {

  beforeAll((done) => {
    User.create({
      email: dummyLogin.email,
      username: dummyLogin.username,
      password: dummyLogin.password
    })
    .then(data => {
      done()
    })
    .catch(err => {
      done(err)
    })
  })
  //
  afterAll(async (done) => {
    try {
      User.destroy({
        where: {},
         truncate:true
      })
      .then(data => {
        return UserStatus.destroy({
          where: {},
           truncate:true
        })
      })
      .then(data => {
        console.log('user has been deleted');
        done();
      })
    } catch (err) {
      done(err);
    }
  })

  describe('POST /register', () => {
    test.only('when success register', (done) => {
      request(app)
        .post('/register')
        .send({
          email: userLogin.email,
          username: userLogin.username,
          password: userLogin.password
        })
        .end(function (err, res) {
          if (err) {
            done(err);
          } else {
            expect(res.status).toBe(201); //expect dapat http response status yang benar
              expect(res.body).toHaveProperty('username');
              expect(res.body).toHaveProperty('message');
              done();
          }
        })
     })
    test.only('when failed register because email not valid', (done) => {
       request(app)
         .post('/register')
         .send({
           email: 'correct_user@mail',
           username: "correct_user",
           password: "correct"
         })
         .end(function (err, res) {
           if (err) {
             done(err);
           } else {
               expect(res.status).toBe(400); //expect dapat http response status yang benar
               expect(res.body).toHaveProperty('message','Invalid Email format. Please re-check your email!');
               done();
           }
         })
      })

    test.only('when failed register because email containing unique character', (done) => {
        request(app)
          .post('/register')
          .send({
            email: 'correct_user!@mail.com',
            username: "incorrect_user",
            password: "correct"
          })
          .end(function (err, res) {
            if (err) {
              done(err);
            } else {
              expect(res.status).toBe(400); //expect dapat http response status yang benar
              expect(res.body).toHaveProperty('message','Invalid Email format. Please re-check your email!');
              done();
            }
          })
       })
    test.only('when failed register because password length under 6 character or not containing unique character', (done) => {
         request(app)
           .post('/register')
           .send({
             email: 'correct_user12@mail.com',
             username: "crc",
             password: "c_usr"
           })
           .end(function (err, res) {
             if (err) {
               done(err);
             } else {
               expect(res.status).toBe(400); //expect dapat http response status yang benar
               expect(res.body).toHaveProperty('message','Password must be 6 character less');
               done();
             }
           })
        })
  })

  describe('POST /login', () => {
    test.only('when success login', (done) => {
      request(app)
        .post('/login')
        .send({
          email: dummyLogin.email,
          password: dummyLogin.password
        })
        .end(function (err, res) {
          if (err) {
            console.log(err)
            console.log(res)
            done(err);
          } else {
            expect(res.status).toBe(200); //expect dapat http response status yang benar
              expect(res.body).toHaveProperty('access_token');
              expect(res.body).toHaveProperty('UserStatus');
              expect(res.body).toHaveProperty('username');
              done();
          }
        })
     })
    test.only('failed login because wrong password', (done) => {
       request(app)
         .post('/login')
         .send({
           email: dummyLogin.email,
           password: "adfhsddsg"
         })
         .end(function (err, res) {
           if (err) {
             done(err);
           } else {
             expect(res.status).toBe(400); //expect dapat http response status yang benar
               expect(res.body).toHaveProperty('message', 'Incorrect Username/Password');
               done();
           }
         })
      })

    test.only('failed login with unregistered email', (done) => {
        request(app)
          .post('/login')
          .send({
            email: "unregistered@mail.com",
            password: "this_is_uncorrect_email"
          })
          .end(function (err, res) {
            if (err) {
              done(err);
            } else {
              expect(res.status).toBe(400); //expect dapat http response status yang benar
                expect(res.body).toHaveProperty('message', 'Email not found on our data. Please register your email first!');
                done();
            }
          })
       })
   })
})
