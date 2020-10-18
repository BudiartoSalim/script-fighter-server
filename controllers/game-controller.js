const { User, ItemShop, Monster, Question, UserStatus } = require('../models')
class GameController {
  static async upgradeStat(req, res, next) {
    const item = await ItemShop.findOne({
      where: {
        id: req.params.item
      }
    })
    const userStatus = await UserStatus.findOne({
    where: {
      UserId: req.params.userid
    }
  })
    const userStatUpdate = await UserStatus.update({
    atk: parseInt(Number(userStatus.atk) + Number(req.body.stat)),
    hp: parseInt(Number(userStatus.hp) + Number(req.body.stat)),
    def: parseInt(Number(userStatus.def) + Number(req.body.stat)),
    money: parseInt(Number(userStatus.money) - Number(item.price))
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
      currentDifficulty: req.body.difficulty,
      maxDifficulty: req.body.difficulty
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
