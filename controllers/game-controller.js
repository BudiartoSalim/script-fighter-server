const { User, ItemShop, Monster, Question, UserStatus } = require('../models')
class GameController {

  //put /shop/:itemid
  static async upgradeStat(req, res, next) {
    const difficultyCap = 2; //current difficulty cap
    try {
      let item = await ItemShop.findOne({
        where: {
          id: req.params.itemid
        }
      })
      const userStatus = await UserStatus.findOne({
        where: {
          UserId: req.payload.id
        }
      })

      //safeguard to ensure user cannot buy more difficulty upgrade when it reaches the cap
      if (userStatus.difficulty >= difficultyCap && item.difficulty >= 0) {
        item.difficulty = 0;
        res.status(400).json({ message: 'Already at max difficulty' })
      } else {
        item.price = item.price + (item.price * item.difficulty); //simple formula to make difficulty price scale
        if (userStatus.money >= item.price) {
          const userStatUpdate = await UserStatus.update({
            atk: (userStatus.atk + item.atk),
            hp: (userStatus.hp + item.hp),
            def: (userStatus.def + item.def),
            money: (userStatus.money - item.price),
            maxDifficulty: userStatus.difficulty + item.difficulty
          }, {
            where: {
              id: userStatus.id
            },
            returning: true,
            plain: true
          })
          res.status(200).json({
            message: 'Successfully upgrade your status',
            userStatus: userStatUpdate[1]
          })
        } else {
          res.status(400).json({
            message: 'money not enough'
          })
        }
      }
    } catch (err) {
      next(err);
    }
  }

  // PATCH /users/difficulty
  static async updateUserDifficulty(req, res, next) {
    try {
      req.body.difficulty = parseInt(req.body.difficulty); //parses difficulty to integer
      const currentStat = await UserStatus.findOne({ where: { UserId: req.payload.id } });

      //safeguard to make sure the request is valid difficulty
      if (req.body.difficulty > currentStat.maxDifficulty || req.body.difficulty < 0 || isNaN(req.body.difficulty)) {
        res.status(400).json({ message: 'Invalid difficulty.' });
      } else {
        await UserStatus.update({ currentDifficulty: req.body.difficulty },
          {
            where: { UserId: req.payload.id },
            returning: true,
            plain: true
          });
        res.status(200).json({
          message: 'Your Difficulty Status has Been updated',
          difficulty: req.body.difficulty
        })
      }
    } catch (err) {
      next(err)
    }
  }
}
module.exports = GameController;
