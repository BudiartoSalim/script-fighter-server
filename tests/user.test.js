const { beforeAll, afterAll, expect } = require('@jest/globals');
const request = require('supertest');
const jwt = require('jsonwebtoken')
const { User } = require('../models')
const { describe } = require('yargs');
const app = require('../app.js');
describe('User Routes Test', () => {

  beforeAll((done) => {
    try {
      //generate data used for testing
      done();
    } catch (err) {
      done(err);
    }
  })

  afterAll((done) => {
    try {
      //destroy or remove the initial test data seeded in beforeAll
      done();
    } catch (err) {
      done(err);
    }
  })

  describe('POST /register', () => {
    test('when success register', (done) => {
      request(app)
        .post('/register')
        .send({
          email: 'correct_user@mail.com',
          username: "correct_user",
          password: "correct"
        })
        .end(function (err, res) {
          if (err) {
            done(err);
          } else {
            expect(res.status).toBe(201); //expect dapat http response status yang benar
              expect(res.body).toHaveProperty('user.username');
              expect(res.body).toHaveProperty('message','Register Successful');
              done();
          }
        })
     })
     test('when failed register because email not valid', (done) => {
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
               expect(res.body).toHaveProperty('message','Email is Invalid');
               done();
           }
         })
      })

      test('when failed register because email containing unique character', (done) => {
        request(app)
          .post('/register')
          .send({
            email: 'correct_user!#$%@mail.com',
            username: "correct_user",
            password: "correct"
          })
          .end(function (err, res) {
            if (err) {
              done(err);
            } else {
              expect(res.status).toBe(400); //expect dapat http response status yang benar
              expect(res.body).toHaveProperty('message','Email cannot be contained unique character set');
              done();
            }
          })
       })
       test('when failed register because username/password length under 6 character', (done) => {
         request(app)
           .post('/register')
           .send({
             email: 'correct_user!#$%@mail.com',
             username: "crct",
             password: "c_usr"
           })
           .end(function (err, res) {
             if (err) {
               done(err);
             } else {
               expect(res.status).toBe(400); //expect dapat http response status yang benar
               expect(res.body).toHaveProperty('message','Username/Password must be at least 6 character');
               done();
             }
           })
        })
  })

  describe('POST /login', () => {
    test('when success login', (done) => {
      request(app)
        .post('/login')
        .send({
          email: "correct_user@mail.com",
          password: "correct"
        })
        .end(function (err, res) {
          if (err) {
            done(err);
          } else {
            expect(res.status).toBe(201); //expect dapat http response status yang benar
              expect(res.body).toHaveProperty('access_token');
              expect(res.body).toHaveProperty('user');
              expect(res.body).toHaveProperty('user.id');
              expect(res.body).toHaveProperty('user.username');
              expect(res.body).toHaveProperty('user.userStatus');
              done();
          }
        })
     })
     test('failed login because wrong password', (done) => {
       request(app)
         .post('/login')
         .send({
           email: "correct_user@mail.com",
           password: "adfhsddsg"
         })
         .end(function (err, res) {
           if (err) {
             done(err);
           } else {
             expect(res.status).toBe(401); //expect dapat http response status yang benar
               expect(res.body).toHaveProperty('message', 'Incorrect Username/Password');
               done();
           }
         })
      })

      test('failed login with unregistered email', (done) => {
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
              expect(res.status).toBe(401); //expect dapat http response status yang benar
                expect(res.body).toHaveProperty('message', 'Email not found on our data. Please register your email first!');
                done();
            }
          })
       })
   })
})
