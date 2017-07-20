var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String
	},
	password: {
		type: String
	},
	email: {
		type: String,
		index:true
	}
});



var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
};

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
};

module.exports.getUserByEmail = function(email, callback){
	var query = {email: email};
	User.findOne(query, callback);
};


module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
};

//Duh: for new player insert
module.exports.insertDocument = function(db,user_id, pl_name, callback) {
   db.collection('players').insertOne( {

    "user_id" : user_id,
    "pl_name" : pl_name,
    "loc_x" : 0,
    "loc_y" : 0,
    "pl_inst" : 0,
    "pl_last_act_time" : Date(),
    "pl_free_stats" : 0,
    "pl_hp" : 50,
    "pl_exp" : 0,
    "pl_gold" : 0,
    "pl_class" : 0,
    "equipment" : {
         "r_hand_id" : 0,
         "l_hand_id" : 0,
         "chest_id" : 0,
         "boots_id" : 0,
         "helm_id" : 0
     },
     "inventory" : {

         "item_id" : 0,
         "item_type" : 0,
         "item_name" : 0,
         "bitem_name_ru" : 0
     }





   }, function(err, result) {
    console.log("player inserted");
    callback();
  });
};
