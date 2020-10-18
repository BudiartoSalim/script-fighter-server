const { User, Item, Monster, Question, UserStatus } = require('../models')

class CombatController {

  // PUT /combat/experience/:userid
  static async gainExperiencePutHandler(req, res, next) {
    try {
      const userStatus = await UserStatus.findOne({
      where: {
        UserId: req.params.userid
      }
    })
    // res.status(200).json(userStatus)
    const statusUpdate = await UserStatus.update({
      collectedExp: parseInt(Number(userStatus.collectedExp) + Number(req.body.experience)),
      money: parseInt(Number(userStatus.money) + Number(req.body.money))
    },{
      where: {
        UserId: req.params.userid
      }
    })
      res.status(200).json({
        message: 'Your status has been updated'
      })
    } catch(err) {
      console.log(err)
      next(err)
    }

  }

  // GET /combat/monster/:idmonster
  static getMonsterHandler(req, res, next) {
    Monster.findOne({
      where: {
        id: req.params.idmonster
      }
    })
    .then(monster => {
      res.status(200).json(monster)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  // POST /combat/question/:idquestion
  // comparing user answer to the question
  static compareAnswerPostHandler(req, res, next) {
    Question.findOne({
      where: {
        id: req.params.idquestion
      }
    })
    .then(questionData => {
      if (req.body.answer === questionData.correct_answer) {
        res.status(200).json({
          answerResult: true
        })
      } else {
        res.status(200).json({
          answerResult: false
        })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

}

module.exports = CombatController;
