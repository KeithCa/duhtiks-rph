var mongoose = require('mongoose');
var User = require('../models/user');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


// location Schema
var LocSchema = mongoose.Schema({
	loc_x: {
		type: Number
	},
	loc_y: {
		type: Number
	},
	loc_inst: {
		type: Number
		
	},
        loc_type: {
		type: Number
	},
        text: {
		type: String
	},
        text_ru: {
		type: String
	}
});

var Locations = module.exports = mongoose.model('Locations', LocSchema);


// players Schema
var PlSchema = mongoose.Schema({
    
        user_id: {
            type: ObjectId
        },
	pl_name: {
		type: String
	},
	loc_x: {
		type: Number
		
	},
        loc_y: {
		type: Number
	},
        pl_inst: {
		type: Number
	},
        pl_last_act_time: {
		type: Date
	},
        pl_free_stats: {
		type: Number
	},
	pl_hp: {
		type: Number
	},
	pl_exp: {
		type: Number
		
	},
        pl_gold: {
		type: Number
	},
        pl_class: {
		type: Number
	},
        equipment: {
		r_hand_id : Number, 
                l_hand_id : Number, 
                chest_id : Number, 
                boots_id : Number, 
                helm_id : Number
	},
        inventory: {
		item_id : Number,
                item_type : Number,
                item_name : String,
                bitem_name_ru : String
	}
    
    
    
});

var Players = module.exports = mongoose.model('Players', PlSchema);





module.exports.getLocByxy = function(loc_x,loc_y, callback){
	var query = {loc_x: 0, loc_y: 0 };
	Locations.find(query, callback);
};




