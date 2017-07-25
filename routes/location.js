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
	 username : req.user.username
});

 var io = req.app.get('socketio');
 io.on('connection', function(socket){
	 console.log("Player : " + req.user.username + " has connected");
  socket.on('getMap', function(){
		console.log("in getMap");
   Locations.getPlayerByUsername(req.user.username, function(err, player){
    var pl_x = player.loc_x;
    var pl_y = player.loc_y;

    Locations.getPlayByxy(pl_x, pl_y, function(err, chars){


   Locations.getLocByxy(pl_x, pl_y, function(err, result){

   socket.emit('heresTheMap', {loc_info: result, pl_info:player, players:chars});
  });
  });
  });
  });



	socket.on('updateMap', function(direction){
		console.log('updateMap called for : '+ req.user.username);
		var moveDir = direction.direction;
		Locations.getPlayerByUsername(req.user.username, function(err, player){
			if(direction.name == req.user.username){
			var pl_x = player.loc_x;
			var pl_y = player.loc_y;
		if(moveDir == "up"){
			pl_y = pl_y + 1;
		}
		else if(moveDir == "down"){
			pl_y = pl_y - 1;
		}
		else if(moveDir == "right"){
			pl_x = pl_x + 1;
		}
		else if(moveDir == "left"){
			pl_x = pl_x - 1;
		}

		Locations.updatePlayerLoc(req.user.username, pl_x, pl_y, function(err, callback){
			socket.emit('updateYourMap');
		});
}
		socket.broadcast.emit('updateYourMap');
});
	});
	socket.on('disconnect', function() {
		console.log("disconnect: ", socket.id);
});
});
});
module.exports = router;
