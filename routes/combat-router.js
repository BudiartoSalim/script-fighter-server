const express = require('express');
const router = express.Router();
const CombatController = require('../controllers/combat-controller.js');

router.put('/experience', CombatController.gainExperiencePutHandler);
router.get('/monster/:idmonster', CombatController.getMonsterHandler);
router.post('/question/:idquestion', CombatController.compareAnswerPostHandler);

module.exports = router;
