const express = require('express');
const router = express.Router();
const GameController = require('../controllers/game-controller.js');

router.get('/', GameController.getShopContent);
router.put('/:itemid', GameController.upgradeStat);


module.exports = router;
