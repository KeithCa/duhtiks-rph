var Spell = require('../scripts/spell');
var spells = {};
spells.firebolt = new Spell("Firebolt", "Fire", 2, 10, 15);
console.log("In spells file, firebolt created. Firebolt cd is:" + spells.firebolt.spell_cd);

exports.spells = spells;
