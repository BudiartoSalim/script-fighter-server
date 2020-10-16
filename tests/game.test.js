const { beforeAll, afterAll, expect } = require('@jest/globals');
const request = require('supertest');
const jwt = require('jsonwebtoken')
const { User, Item, Monster, Question } = require('../models')
const { describe } = require('yargs');
const app = require('../app.js');
let dummyToken;
let dummyUser;
let dummyitem;
let dummyQuestion;
let dummyMonster;
describe('Game Routes Test', () => {

  beforeAll( async (done) => {
    try {
      dummyUser = await User.create({
        username: 'dummy_user',
        email: 'dummy_user@mail.com',
        password: 'dummy_user12'
      })
      dummyItem = await Item.create({
        item_name: 'Resurection Scroll',
        price: 999999,
        description: 'Change player status to Undefeatable'
      })
      dummyQuestion = await Question.create({
        question: 'Is this a question?',
        answer: 'Correct,Wrong,False,True',
        correct_answer: 'Correct',
        explanation: 'https://www.google.com/',
        difficulty: 'Insane'
      })
      dummyMonster = await Monster.create({
        monster_name: 'Imhotep',
        hp: 999999,
        atk: 999999,
        def: 999999,
        money: 999999,
        experience: 10,
        difficulty: 3,
        monster_image: 'https://www.google.com/'
      })
      dummyToken = jwt.sign({id: dummyUser.id, email: dummyUser.email, userStatus: dummyUser.userStatus}, process.env.SECRET_KEY)
      done()
    } catch (e) {
    done(e)
    }
  })

  afterAll((done) => {
    try {
      User.destroy({
        where: {
          id: dummyUser.id
        }
      })
      .then(data => {
        console.log('User has Been Delete')
        return Item.destroy({
          where: {
            id: dummyItem.id
          }
        })
      })
      .then(data => {
        console.log('Item Has Been Deleted')
        return Monster.destroy({
          where: {
            id: dummyMonster.id
          }
        })
      })
      .then(data => {
        console.log('Monster has been deleted')
        return Question.destroy({
          where: {
            id: dummyQuestion.id
          }
        })
      })
      .then(data => {
        console.log('All data has Been deleted')
        done()
      })
      .catch(err => {
        console.log(err)
        done(err)
      })
    } catch (err) {
      done(err);
    }
  })

  describe('PUT /combat/experience/:userid', () => {
    test("Success put player exp", (done) => {
      request(app)
      .put(`/combat/experience/${dummyUser.id}`)
      .set('access_token', dummyToken)
      .send({
        exp: 10,
        money: 50
      })
      .end(function(err,res) {
        if(err) {
          done(err)
        } else {
          expect(res.status).toBe(200)
          expect(res.body).toHaveProperty('userStatus')
          done()
        }
      })
    })
    test("Failed put player exp without access_token", (done) => {
      request(app)
      .put(`/combat/experience/${dummyUser.id}`)
      .send({
        exp: 10,
        money: 50
      })
      .end(function(err,res) {
        if(err) {
          done(err)
        } else {
          expect(res.status).toBe(400)
          expect(res.body).toHaveProperty('message', 'Unauthorize Access')
          done()
        }
      })
    })
    test("Failed put player exp with non-integer value of exp", (done) => {
      request(app)
      .put(`/combat/experience/${dummyUser.id}`)
      .set('access_token', dummyToken)
      .send({
        exp: 'asd',
        money: 50
      })
      .end(function(err,res) {
        if(err) {
          done(err)
        } else {
          expect(res.status).toBe(400)
          expect(res.body).toHaveProperty('message', 'Invalid type of exp')
          done()
        }
      })
    })
    test("Failed put player exp with non-integer value of money", (done) => {
      request(app)
      .put(`/combat/experience/${dummyUser.id}`)
      .set('access_token', dummyToken)
      .send({
        exp: 13,
        money: 'uangkuuu'
      })
      .end(function(err,res) {
        if(err) {
          done(err)
        } else {
          expect(res.status).toBe(400)
          expect(res.body).toHaveProperty('message', 'Invalid type of money')
          done()
        }
      })
    })
  })

  describe('PUT /shop/:userid/:item', () => {
    test("Success buy player exp", (done) => {
      request(app)
      .put(`/shop/${dummyUser.id}/${dummyitem.id}`)
      .set('access_token', dummyToken)
      .send({
        stat: 10,
        money: 50
      })
      .end(function(err,res) {
        if(err) {
          done(err)
        } else {
          expect(res.status).toBe(200)
          expect(res.body).toHaveProperty('userStatus')
          expect(res.body).toHaveProperty('message', 'Successfully upgrade your status')
          done()
        }
      })
    })
    test("failed buy item without access_token", (done) => {
      request(app)
      .put(`/shop/${dummyUser.id}/${dummyitem.id}`)
      .send({
        stat: 10,
        money: 50
      })
      .end(function(err,res) {
        if(err) {
          done(err)
        } else {
          expect(res.status).toBe(401)
          expect(res.body).toHaveProperty('message', 'Unauthorize Access')
          done()
        }
      })
    })
    test("failed buy item because insufficient money", (done) => {
      request(app)
      .put(`/shop/${dummyUser.id}/${dummyitem.id}`)
      .set('access_token', dummyToken)
      .send({
        stat: 10,
        money: 1
      })
      .end(function(err,res) {
        if(err) {
          done(err)
        } else {
          expect(res.status).toBe(400)
          expect(res.body).toHaveProperty('message', 'Insufficient Money to Buy Item')
          done()
        }
      })
    })
    test("failed buy item because invalid type of money", (done) => {
      request(app)
      .put(`/shop/${dummyUser.id}/${dummyitem.id}`)
      .set('access_token', dummyToken)
      .send({
        stat: 10,
        money: 'aga'
      })
      .end(function(err,res) {
        if(err) {
          done(err)
        } else {
          expect(res.status).toBe(400)
          expect(res.body).toHaveProperty('message', 'Please Enter a Valid Value')
          done()
        }
      })
    })

    test("failed buy item because invalid type of stat", (done) => {
      request(app)
      .put(`/shop/${dummyUser.id}/${dummyitem.id}`)
      .set('access_token', dummyToken)
      .send({
        stat: 'GODLIKE',
        money: 50
      })
      .end(function(err,res) {
        if(err) {
          done(err)
        } else {
          expect(res.status).toBe(400)
          expect(res.body).toHaveProperty('message', 'Please Enter a Valid Value')
          done()
        }
      })
    })
    test("failed buy item because negative value of stat/money", (done) => {
      request(app)
      .put(`/shop/${dummyUser.id}/${dummyitem.id}`)
      .set('access_token', dummyToken)
      .send({
        stat: -5,
        money: 50
      })
      .end(function(err,res) {
        if(err) {
          done(err)
        } else {
          expect(res.status).toBe(400)
          expect(res.body).toHaveProperty('message', 'cannot post with negative value')
          done()
        }
      })
    })
   })
   describe('POST /combat/question/:idquestion', () => {
     test('When user Answer is correct', (done) => {
       request(app)
       .post(`/combat/question/${dummyQuestion}`)
       .send({
         answer: 'Correct'
       })
       .end(function(err,res) {
         if(err) {
           done(err)
         } else {
           expect(res.status).toBe(200)
           expect(res.body).toHaveProperty('answerResult', true)
           done()
         }
       })
     })
     test('When user Answer is False', (done) => {
       request(app)
       .post(`/combat/question/${dummyQuestion}`)
       .send({
         answer: 'Correct'
       })
       .end(function(err,res) {
         if(err) {
           done(err)
         } else {
           expect(res.status).toBe(200)
           expect(res.body).toHaveProperty('answerResult', false)
         }
       })
     })
     test('When user Answer is invalid', (done) => {
       request(app)
       .post(`/combat/question/${dummyQuestion}`)
       .send({
         answer: -5
       })
       .end(function(err,res) {
         if(err) {
           done(err)
         } else {
           expect(res.status).toBe(400)
           expect(res.body).toHaveProperty('message', 'Invalid Type of Answer')
         }
       })
     })
   })
   describe('PATCH /users/:userid/difficulty', () => {
     test('success editing user difficulty', (done) => {
       request(app)
       .patch(`/users/${dummyUser.id}/difficulty`)
       .set('access_token',dummyToken)
       .send({
         difficulty: 2
       })
       .end(function(err, res) {
         if(err) {
           done(err)
         } else {
           expect(res.status).toBe(200)
           expect(res.body).toHaveProperty('message', 'Current Diffculty Has Been Updated')
           expect(res.body).toHaveProperty('userStatus')
           done()
         }
       })
     })
     test('failed editing user difficulty without access_token', (done) => {
       request(app)
       .patch(`/users/${dummyUser.id}/difficulty`)
       .send({
         difficulty: 2
       })
       .end(function(err, res) {
         if(err) {
           done(err)
         } else {
           expect(res.status).toBe(400)
           expect(res.body).toHaveProperty('message', 'Unauthorize Access')
           done()
         }
       })
     })
     test('failed editing user difficulty because of over-range or under-ranged difficulty value', (done) => {
       request(app)
       .patch(`/users/${dummyUser.id}/difficulty`)
       .set('access_token',dummyToken)
       .send({
         difficulty: -3
       })
       .end(function(err, res) {
         if(err) {
           done(err)
         } else {
           expect(res.status).toBe(400)
           expect(res.body).toHaveProperty('message', 'Please Enter a Valid Difficulty Value')
           done()
         }
       })
     })
     test('failed editing user difficulty because different type of difficulty value', (done) => {
       request(app)
       .patch(`/users/${dummyUser.id}/difficulty`)
       .set('access_token',dummyToken)
       .send({
         difficulty: 'GODLIKE'
       })
       .end(function(err, res) {
         if(err) {
           done(err)
         } else {
           expect(res.status).toBe(400)
           expect(res.body).toHaveProperty('message', 'Different type of Diffculty Value')
           done()
         }
       })
     })
   })
})
