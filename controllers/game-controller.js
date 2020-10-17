const { User, Item, Monster, Question, UserStatus } = require('../models')
class GameController {
  static async upgradeStat(req, res, next) {
    const item = await Item.findOne({
      where: {
        id: req.params.item
      }
    })
    await UserStatus.update({
      atk: parseInt(Number(atk) + Number(req.body.stat)),
      hp: parseInt(Number(hp) + Number(req.body.stat)),
      def: parseInt(Number(def) + Number(req.body.stat)),
      money: parseInt(Number(money) + Number(req.body.money))
    },{
      where: {
        id: req.params.userid
      }
    })
    .then(data => {
      res.status(200).json({
        message: 'Your status has been updated'
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
  static updateUserDifficult(req, res, next) {
    UserStatus.update({
      currentDifficulty: req.body.difficulty
    }, {
      where: {
        UserId: req.params.userid
      }
    })
    .then(data => {
      res.status(500).json({
        message: 'Your Difficulty Status has Been updated'
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
}
module.exports = GameController;
