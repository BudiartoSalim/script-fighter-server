const express = require('express');
const router = express.Router();
const CombatController = require('../controllers/combat-controller.js');

router.put('/experience/:userid', CombatController.gainExperiencePutHandler);
router.get('/monster/:idmonster', CombatController.getMonsterHandler);
router.post('/question/:idquestion', CombatController.getMonsterHandler);

module.exports = router;
