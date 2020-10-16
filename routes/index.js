const express = require('express');
const router = express.Router();
const CombatRouter = require('./combat-router.js');

const UserController = require('../controllers/user-controller.js');

router.post('/register', UserController.registerNewUserPostHandler);
router.post('/login', UserController.loginUserPostHandler);
router.use('/combat', CombatRouter);

module.exports = router;