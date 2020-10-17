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
      res.status(500).json({ message: err.errors[0].message })
    }
  }

  // POST /login
  static async loginUserPostHandler(req, res, next) {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } })
      if (userData) {
        if (bcrypt.compareSync(req.body.password, userData.password)) {
          let access_token = jwt.sign({ id: userData.id, }, process.env.JWT_SECRET_KEY);
          res.status(200).json({ access_token: access_token });
        } else {
          res.status(401).json({ message: 'Wrong email or password.' });
        }
      } else {
        res.status(401).json({ message: 'Wrong email or password.' });
      }
    } catch (err) {
      res.status(500).json({ message: err.errors[0].message });
    }

  }

}

module.exports = UserController;