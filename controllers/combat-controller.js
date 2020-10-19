const { User, Item, Monster, Question, UserStatus } = require('../models')
const levelupCheck = require('../helpers/levelup-checker.js'); //takes 1 parameter userid, returns promise new status

class CombatController {

  // PUT /combat/experience/:userid
  static async gainExperiencePutHandler(req, res, next) {
    try {
      const userCurrentStatus = await UserStatus.findOne({
        where: {
          UserId: req.params.userid
        }
      })

      const statusUpdate = await UserStatus.update({
        collectedExp: (userCurrentStatus.collectedExp + parseInt(req.body.experience)),
        money: (userCurrentStatus.money + parseInt(req.body.money))
      }, {
        where: {
          UserId: req.params.userid
        },
        returning: true,
        plain: true
      })
      if (statusUpdate[1].collectedExp >= statusUpdate[1].requiredExp) {
        const leveledUpStat = await levelupCheck(statusUpdate[1].UserId);
        res.status(200).json({ status: leveledUpStat[1] });
      } else {
        res.status(200).json({ status : statusUpdate[1] });
      }
    } catch (err) {
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
    // res.status(200).json({
    //   message: 'Hai'
    // })
    Question.findOne({
      where: {
        id: req.params.idquestion
      }
    })
      .then(questionData => {
        console.log(req.body.answer === questionData.correct_answer)
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
