var express = require('express');
var router = express.Router();
var colors = {};
var lastActions = {};
var model = require('../models/model');
var map = require('../models/keith_map_model');
var Locations = require('../models/location_model');
router.get('/', function(req, res){
 res.render('location', {
});

});


router.get('/keith', function(req, res){
 res.render('keith', {
});
var io = req.app.get('socketio');

 var io = req.app.get('socketio');
 io.on('connection', function(socket){
  socket.on('getMap', function(){
   Locations.getPlayerByUsername(req.user.username, function(err, player){
    var pl_x = player.loc_x;
    var pl_y = player.loc_y;
   Locations.getLocByxy(pl_x, pl_y, function(err, result){
   socket.emit('heresTheMap', {loc_info: result, pl_info:player});
  });
  });
  });
	socket.on('updateMap', function(direction){
		direction = direction.direction;
		Locations.getPlayerByUsername(req.user.username, function(err, player){
			var pl_x = player.loc_x;
			var pl_y = player.loc_y;
			console.log(player);
		if(direction == "up"){
			pl_y = pl_y + 1;
			console.log("in direction is up y is = " + pl_y);
			player.loc_y = pl_y; //shouldnt have this in future
		}
		else if(direction == "down"){
			pl_y = pl_y - 1;
		}
		else if(direction == "right"){
			pl_x = pl_x + 1;
		}
		else if(direction == "left"){
			pl_x = pl_x - 1;
		}
		Locations.updatePlayerLoc(req.user.username, pl_x, pl_y, function(err, callback){
			console.log(callback);
		});
		player.loc_y = pl_y;
		player.loc_x = pl_x;
		Locations.getLocByxy(pl_x, pl_y, function(err, result){
		socket.emit('heresTheMap', {loc_info: result, pl_info:player});
	 });
	});
	});
});
});
module.exports = router;
