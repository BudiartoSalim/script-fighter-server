const { User, ItemShop, Monster, Question, UserStatus } = require('../models')
class GameController {

  //put /shop/:userid/:item
  static async upgradeStat(req, res, next) {
    const item = await ItemShop.findOne({
      where: {
        id: req.params.item
      }
    })
    const userStatus = await UserStatus.findOne({
      where: {
        UserId: req.payload.id
      }
    })
    const userStatUpdate = await UserStatus.update({
      atk: (userStatus.atk + parseInt(req.body.stat)),
      hp: (userStatus.hp + parseInt(req.body.stat)),
      def: (userStatus.def + parseInt(req.body.stat)),
      money: (userStatus.money - parseInt(item.price))
    }, {
      where: {
        id: userStatus.id
      }
    })
      .then(data => {
        res.status(200).json({
          message: 'Successfully upgrade your status',
          userStatus
        })
      })
      .catch(err => {
        next(err)
        // res.status(500).json(err)
      })
  }
  static updateUserDifficult(req, res, next) {
    UserStatus.update({
      currentDifficulty: req.body.difficulty,
      maxDifficulty: req.body.difficulty
    }, {
      where: {
        UserId: req.payload.id
      }
    })
      .then(data => {
        res.status(200).json({
          message: 'Your Difficulty Status has Been updated'
        })
      })
      .catch(err => {
        next(err)
        // res.status(500).json(err)
      })
  }
}
module.exports = GameController;
