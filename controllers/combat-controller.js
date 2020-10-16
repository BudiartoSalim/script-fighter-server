const { User, Item, Monster, Question, UserStatus } = require('../models')

class CombatController {

  // PUT /combat/experience/:userid
  static gainExperiencePutHandler(req, res, next) {
    let userId = User.findOne({
      where: {
        id: req.params.userid
      }
    })
    UserStatus.update({
      collectedExp: Number(collectedExp) + Number(req.body.collectedExp)
    },{
      where: {
        UserId: userId.id
      }
    })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json(err)
    })
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
