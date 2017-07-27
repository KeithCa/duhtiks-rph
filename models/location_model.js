var mongoose = require('mongoose');
var User = require('../models/user');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var player;

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


module.exports.getPlayerByUsername = function(username, callback){
  player = Players;
	var query = {pl_name: username};
	Players.findOne(query, callback);
};



module.exports.getLocByxy = function(loc_x,loc_y, callback){
	var query = {"loc_x": {

      "$gte": loc_x - 3,
      "$lte": loc_x + 3

    }, "loc_y": {
        "$gte": loc_y - 3,
        "$lte": loc_y + 3
      } };
  Locations.find(query, callback);
};


module.exports.getPlayByxy = function(loc_x,loc_y, callback){
	var query = {"loc_x": {

      "$gte": loc_x - 3,
      "$lte": loc_x + 3

    }, "loc_y": {
        "$gte": loc_y - 3,
        "$lte": loc_y + 3
      } };
  Players.find(query, callback);
};

module.exports.updatePlayerLoc = function(username, loc_x, loc_y, callback){
  console.log("in update" + username);
	var query = {pl_name: username};
  Players.update(query, { loc_x: loc_x, loc_y: loc_y }, callback);
};

module.exports.checkLoc = function(loc_x, loc_y, callback){
	var query = {loc_x: loc_x, loc_y: loc_y};
	Locations.findOne(query, callback);
};


module.exports.updateLoc = function(locx, locy, callback){
  console.log("in update" + locx + ":"+locy);
	var query = {loc_x: locx, loc_y: locy};
  Locations.update(query, { loc_x: locx, loc_y: locy }, callback);
};

module.exports.createLoc = function(locx, locy, callback){
  console.log("create" + locx + ":"+locy);
	var query = {loc_x: locx, loc_y: locy};
  Locations.update(query, { loc_x: locx, loc_y: locy }, callback);
};

//Duh: for new player insert
module.exports.createLoc = function(db,locx, locy, callback) {
   db.collection('locations').insertOne( {

    "loc_x" : locx,
    "loc_y" : locy,
    "loc_inst" : 0,
    "loc_type" : 1,
    "text" : "test",
    "text_ru" : "test_ru"
    
   }, function(err, result) {
    console.log("location inserted");
    callback();
  });
};
