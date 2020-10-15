const { beforeAll, afterAll, expect } = require('@jest/globals');
const request = require('supertest');
const { describe } = require('yargs');
const app = require('../app.js');

describe('Test Case', () => {

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

  describe('route to test', () => {
    test('expected result on the feature', (done) => {
      /* 
      ========SAMPLE TEST CASE========
      
      request(app)
        .post('/path')
        .set('access_token', token) //for stuffs in header for example, set token from beforeAll seed
        .send({
          name: "something",
          password: "somethang"
        })
        .end(function (err, res) {
          if (err) {
            done(err);
          } else {
            expect(res.status).toBe(200); //expect dapat http response status yang benar
            expect(res.body).toHaveProperty('namaVariableAtauToken', 'content, ini optional');
            done();
          }
        }) */
    })


  })

})