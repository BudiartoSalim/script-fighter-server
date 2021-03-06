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
        hp: 15,
        atk: 5,
        def: 3,
        requiredExp: 100,
        collectedExp: 0,
        money: 100,
        maxDifficulty: 0,
        currentDifficulty: 0,
        reputation: 0,
        UserId: newUser.id
      })
      res.status(201).json({ username: newUser.username, message: `User ${newUser.username} successfully registered!` });
    } catch (err) {
      next(err);
    }
  }

  // POST /login
  static async loginUserPostHandler(req, res, next) {
    try {
      const userData = await User.findOne({ where: { email: req.body.email }, include: UserStatus })
      if (userData) {
        if (bcrypt.compareSync(req.body.password, userData.password)) {
          let access_token = jwt.sign({ id: userData.id, username: userData.username }, process.env.JWT_SECRET_KEY);
          res.status(200).json({
            access_token: access_token,
            username: userData.username,
            UserStatus: userData.UserStatus
          });
        } else {
          next({ name: 'LoginError', message: 'Incorrect Username/Password' });
        }
      } else {
        next({ name: 'LoginError', message: 'Incorrect Username/Password' });
      }
    } catch (err) {
      next(err);
    }
  }

  static async getUserRankHandler(req, res, next) {
    try {
      const userRank = await UserStatus.findAll({
        attributes: ['level', 'collectedExp'],
        include: [{
          model: User,
          attributes: ['username'],
          right: true
        }],
        order: [['collectedExp', 'DESC']],
        limit: 10
      })
      res.status(200).json({ userRank });
    } catch (err) {
      next(err);
    }
  }

}

module.exports = UserController;
