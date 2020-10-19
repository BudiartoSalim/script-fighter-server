const express = require('express');
const router = express.Router();
const CombatRouter = require('./combat-router.js');
const userAuthentication = require('../middlewares/authentication.js');

const UserController = require('../controllers/user-controller.js');
const GameController = require('../controllers/game-controller.js');

router.post('/register', UserController.registerNewUserPostHandler);
router.post('/login', UserController.loginUserPostHandler);
router.use(userAuthentication);
router.use('/combat', CombatRouter);
router.put('/shop/:item', GameController.upgradeStat);
router.patch('/users/difficulty', GameController.updateUserDifficult);

module.exports = router;
