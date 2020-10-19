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
      // res.status(201).json(newUser)
      res.status(201).json({ username: newUser.username, message: `User ${newUser.username} successfully registered!` });
    } catch (err) {
      console.log(err)
      next(err);
    }
  }

  // POST /login
  static async loginUserPostHandler(req, res, next) {
    try {
      const userData = await User.findOne({ where: { email: req.body.email }, include: UserStatus })
      if (userData) {
        if (bcrypt.compareSync(req.body.password, userData.password)) {
          let access_token = jwt.sign({ id: userData.id, }, process.env.JWT_SECRET_KEY);
          res.status(200).json({ access_token: access_token, user: userData });
        } else {
          next({ name: 'LoginError', message: 'Incorrect Username/Password' });
        }
      } else {
        next({ name: 'LoginError', message: 'Email not found on our data. Please register your email first!' });
      }
    } catch (err) {
      next(err);
    }
  }

}

module.exports = UserController;
