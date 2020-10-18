const { UserStatus } = require('../models/index.js');

//returns a promise
async function levelupCheck(id) {
  //base modifier for each levelup
  //hp atk and def is simple increment per level
  //requiredExp uses specific formula which can be checked below
  const levelUpModifier = {
    hp: 10,
    atk: 5,
    def: 2,
    requiredExp: 100
  }
  try {
    const currentStatus = await UserStatus.findOne({ where: { UserId: id } });
    //levelup check starts here
    //counter is used to check how many times the user leveled up
    //leveledExp is requiredExp before level up happens, for each level up it will be incremented
    let leveledExp = currentStatus.requiredExp;
    let counter = 0;
    while (currentStatus.collectedExp >= leveledExp) {
      leveledExp += currentStatus.requiredExp + (levelUpModifier.requiredExp * (currentStatus.level + counter));
      counter++;
    }//this loop will calculate next requiredExp 
    //as long as currentExp is higher than requiredExp, it will repeat
    //end of levelup check
    const output = await UserStatus.update({
      level: currentStatus.level + counter,
      hp: currentStatus.hp + (counter * levelUpModifier.hp),
      atk: currentStatus.atk + (counter * levelUpModifier.atk),
      def: currentStatus.def + (counter * levelUpModifier.def),
      requiredExp: leveledExp
    }, { where: { UserId: id }, returning: true, plain: true });
    return output;
  } catch (err) {
    return err;
  }
}

module.exports = levelupCheck;