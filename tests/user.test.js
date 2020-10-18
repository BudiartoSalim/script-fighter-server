const { beforeAll, afterAll, expect } = require('@jest/globals');
const request = require('supertest');
const jwt = require('jsonwebtoken')
const { User, UserStatus } = require('../models')
// const { describe } = require('yargs');
const app = require('../app.js');
// const request = require('supertest')
describe('User Routes Test', () => {

  // beforeAll((done) => {
  // })
  //
  afterAll(async (done) => {
    try {
      const deleteUser = await User.findOne({
        where: {
          email: 'correct_user@mail.com'
        }
      })
      User.destroy({
        where: {
          id: deleteUser.id
        }
      })
      .then(data => {
        return UserStatus.destroy({
          where: {
            UserId: deleteUser.id
          }
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
          email: 'correct_user@mail.com',
          username: "correct_user",
          password: "correct"
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
               expect(res.body).toHaveProperty('message','Must be an email format.');
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
              expect(res.body).toHaveProperty('message','Email cannot be contained unique character set or must be 6 character less');
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
          email: "correct_user2@mail.com",
          password: "correct_userku"
        })
        .end(function (err, res) {
          if (err) {
            console.log(err)
            console.log(res)
            done(err);
          } else {
            expect(res.status).toBe(200); //expect dapat http response status yang benar
              expect(res.body).toHaveProperty('access_token');
              expect(res.body).toHaveProperty('user');
              expect(res.body).toHaveProperty('status');
              done();
          }
        })
     })
    test.only('failed login because wrong password', (done) => {
       request(app)
         .post('/login')
         .send({
           email: "correct_user2@mail.com",
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
