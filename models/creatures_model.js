var mongoose = require('mongoose');
var User = require('../models/user');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
    
// creature template Schema
var CreaturesSchema = mongoose.Schema({

	cr_name: {
		type: String
	},
	cr_name_ru: {
		type: String
	},
	cr_speed: {
		type: Number
	},
        cr_dmg_min: {
		type: Number
	},
        cr_dmg_max: {
		type: Number
	},
        cr_hp: {
		type: Number
	},
        cr_spawn_x: {
		type: Number
	},
        cr_spawn_y: {
		type: Number
	},
        cr_spawn_range: {
		type: Number
	},
        cr_spawn_max: {
		type: Number
	},
        cr_inst: {
		type: Number
	},
        cr_side: {
		type: Number
	},
        cr_exp_give: {
		type: Number
	},
        cr_agro: {
		type: Number
	},
        cr_att_cd: {
		type: Number
	},
        cr_lvl: {
		type: Number
	},
        cr_spawn_int: {
		type: Number
	},
        cr_last_spawn: {
		type : Date, default: Date.now 
	}
        
});

var Creatures = module.exports = mongoose.model('Creatures', CreaturesSchema);



//  Location creature Schema
var LocCreaturesSchema = mongoose.Schema({

	
	loc_cr_id: {
		type: Number

	},
        loc_cr_x: {
		type: Number
	},
        loc_cr_y: {
		type: Number
	},
        loc_cr_target_id: {
		type: Number
	},
        loc_cr_inst: {
		type: Number
	},
        loc_cr_can_see: {
		type: Number
	},
        loc_cr_last_action: {
		type : Date, default: Date.now 
	},
        loc_cr_side: {
		type: Number
	}
        
        
});

var LocCreatures = module.exports = mongoose.model('LocCreatures', LocCreaturesSchema);


module.exports.checkCrSpawn = function(callback){
  
	Creatures.find(callback);
};
