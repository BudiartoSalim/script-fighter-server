const request = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../app.js')
const { ItemShop, User, UserStatus, Monster, Question } = require('../models')
let dummyToken;
let dummyUser = {
  username: 'dummy_user',
  email: 'dummy_user@mail.com',
  password: 'dummy_user'
}
let dummyUserId;
let dummyItemId;
let dummyMonsterId;
let dummyQuestionId;
describe("Game Routes Unit Test", () => {
  beforeAll(async (done) => {
    try {
      const user = await User.create({
        email: dummyUser.email,
        username: dummyUser.username,
        password: dummyUser.password,
      })
      dummyUserId = await User.findOne({
        where: {
          id: user.id
        }
      })
      const userStatus = await UserStatus.create({
          level: 1,
          hp: 100,
          atk: 30,
          def: 25,
          requiredExp: 100,
          collectedExp: 0,
          money: 500,
          maxDifficulty: 1,
          currentDifficulty: 1,
          reputation: 0,
          UserId: dummyUserId.id
        })
      const monster = await Monster.create({
          monster_name: 'Imhotep',
          hp: 999,
          atk: 999,
          def: 999,
          money: 999,
          experience: 10,
          difficulty: 3,
          monster_image: 'https://www.google.com/'
        })
      dummyMonsterId = await Monster.findOne({
          where: {
            id: monster.id
          }
        })
      const pertanyaan = await Question.create({
          question: 'Is this a question?',
          answer: 'Correct,Wrong,False,True',
          correct_answer: 'Correct',
          explanation: 'https://www.google.com/',
          difficulty: 2
        })
      dummyQuestionId = await Question.findOne({
          where: {
            id: pertanyaan.id
          }
        })
      const item = await ItemShop.create({
          item_name: 'Resurection Scroll',
          price: 999,
          description: 'Change player status to Undefeatable',
          atk: 10,
          hp: 10,
          def: 0,
          difficulty: 1
        })
      dummyItemId = await ItemShop.findOne({
          where: {
            id: item.id
          }
        })
      dummyToken = await jwt.sign({id: dummyUserId.id, username: dummyUserId.username, status: dummyUserId.UserStatus}, process.env.JWT_SECRET_KEY)
      done()
    } catch (err) {
      console.log(err)
      done(err)
    }
  })

  describe("PUT /combat/experience", () => {
    describe("when success gain exp", () => {
      test.only("Success adding user exp", (done) => {
        console.log(dummyUserId)
         request(app)
        .put(`/combat/experience`)
        .send({
          experience: 10,
          money: 50
        })
        .set('access_token', dummyToken)
        .expect(200)
        .end(function(err,res){
          if(err) {
            done(err)
          } else {
            expect(res.body).toHaveProperty('status')
            done()
          }
        })
      })
    })
    describe("when failed gain exp", () => {
      test.only("Failed put player exp with non-integer value of exp", (done) => {
        request(app)
        .put(`/combat/experience`)
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
      test.only("Failed adding user exp because no have access_token", (done) => {
        console.log(dummyUserId)
         request(app)
        .put(`/combat/experience`)
        .send({
          experience: 10,
          money: 50
        })
        .expect(401)
        .end(function(err,res){
          if(err) {
            done(err)
          } else {
            expect(res.body).toHaveProperty('message','Unauthorized.')
            done()
          }
        })
      })

    })
  })
  describe("PUT /shop/:item", () =>{
    test.only("Success upgrade status", (done) => {
      request(app)
      .put(`/shop/${dummyItemId.id}`)
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
    test("Failed upgrade status without access_token", (done) => {
      request(app)
      .put(`/shop/${dummyItemId.id}`)
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
  })
  describe("POST /combat/question/:idquestion",() => {
    test('Checking Answer if User Answer is true', (done) => {
      request(app)
      .post(`/combat/question/${dummyQuestionId.id}`)
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
    test('Checking Answer if User Answer is true', (done) => {
      request(app)
      .post(`/combat/question/${dummyQuestionId.id}`)
      .send({
        answer: 'False'
      })
      .end(function(err,res) {
        if(err) {
          done(err)
        } else {
          expect(res.status).toBe(200)
          expect(res.body).toHaveProperty('answerResult', false)
          done()
        }
      })
    })
  })
  describe('PATCH /users/difficulty', () => {
    test("success editing user difficulty",(done) => {
      request(app)
      .patch(`/users/difficulty`)
      .set('access_token',dummyToken)
      .send({
        difficulty: 1
      })
      .end(function(err, res) {
        if(err) {
          done(err)
        } else {
          expect(res.status).toBe(200)
          expect(res.body).toHaveProperty('message', 'Your Difficulty Status has Been updated')
          done()
        }
      })
    })
    test("failed editing user difficulty",(done) => {
      request(app)
      .patch(`/users/difficulty`)
      .set('access_token',dummyToken)
      .send({
        difficulty: -10
      })
      .end(function(err, res) {
        if(err) {
          done(err)
        } else {
          expect(res.status).toBe(400)
          expect(res.body).toHaveProperty('message', 'Cannot Post with Negative Value')
          done()
        }
      })
    })
    test("failed editing user difficulty without access_token",(done) => {
      request(app)
      .patch(`/users/difficulty`)
      .send({
        difficulty: 1
      })
      .end(function(err, res) {
        if(err) {
          done(err)
        } else {
          expect(res.status).toBe(401)
          expect(res.body).toHaveProperty('message', 'Unauthorize Access')
          done()
        }
      })
    })
  })
  describe("Get Monster", () => {
    test("Retrive Monster Data from Database",(done) => {
      request(app)
      .get(`/combat/monster/${dummyMonsterId.id}`)
      .set('access_token',dummyToken)
      .end(function(err, res) {
        if(err) {
          done(err)
        } else {
          expect(res.status).toBe(200)
          expect(res.body).toHaveProperty('monster')
          done()
        }
      })
    })
  })

  afterAll((done) => {
    try {
      User.destroy({
        where: {},
        truncate: true
      })
      .then(data => {
        console.log('User has Been Delete')
        return ItemShop.destroy({
          where: {},
          truncate: true
        })
      })
      .then(data => {
        console.log('Item Has Been Deleted')
        return Monster.destroy({
          where: {},
          truncate: true
        })
      })
      .then(data => {
        console.log('Monster has been deleted')
        return Question.destroy({
          where: {},
          truncate: true
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
})
