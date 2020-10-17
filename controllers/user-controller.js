const { User, UserStatus } = require('../models/index.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
  // POST /register
  static async registerNewUserPostHandler(req, res, next) {
    try {
      const newUser = await User.create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      })
      const newUserStatus = await UserStatus.create({
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
        UserId: newUser.id
      })
      res.status(201).json({ message: `User ${req.body.username} successfully registered!` });
    } catch (err) {
      next(err);
    }
  }

  // POST /login
  static async loginUserPostHandler(req, res, next) {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } })
      // console.log(userData)
      if (userData) {
        if (bcrypt.compareSync(req.body.password, userData.password)) {
          console.log(bcrypt.compareSync(req.body.password, userData.password))
          let access_token = jwt.sign({ id: userData.id, }, 'ShiroGane12^E&WTEW&');

          res.status(200).json({ access_token: access_token });
        } else {
          next({ name: 'LoginError', message: 'Wrong email or password.' });
        }
      } else {
        next({ name: 'LoginError', message: 'Wrong email or password.' });
      }
    } catch (err) {
      console.log(err)
      next(err);
    }

  }

}

module.exports = UserController;
