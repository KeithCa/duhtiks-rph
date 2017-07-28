var express = require('express');
var router = express.Router();
var model = require('../models/model');
var map = require('../models/keith_map_model');
var Locations = require('../models/location_model');



router.get('/', function(req, res){
 res.render('builder', {
	 username : req.user.username
});
 var io = req.app.get('socketio');

let socket_id = [];
let users = new Object(); // Store users
io.on('connection', function(socket) {
      socket_id.push(socket.id);
      if (socket_id[0] === socket.id) {
        // remove the connection listener for any subsequent
        // connections with the same ID
        io.removeAllListeners('connection');
      }
  socket.on('disconnect', function() {
    console.log("User has disconnected: " + users[socket.id])
    delete users[socket.id]; // User disconnected, delete from list
  });

  socket.on('add user', function(username) {
    users[socket.id] = username; // Add user to list
    console.log("User has joined: " + username);
    socket.emit('startMap',{username:users[socket.id]});
  });
  socket.on('getMap', function(){
    console.log("in getMap for" + users[socket.id]);
   Locations.getPlayerByUsername(users[socket.id] , function(err, player){
    var pl_x = player.loc_x;
    var pl_y = player.loc_y;

    Locations.getPlayByxy(pl_x, pl_y, function(err, chars){


   Locations.getLocbuilder(pl_x, pl_y, function(err, result){

   socket.emit('heresTheMap', {loc_info: result, pl_info:player, players:chars});
  }); //end getLocBy
  });//end getPlayByXY
  });//end getPlayerByusername
  });//end getMap

  socket.on('updateMap', function(direction){
    console.log('updateMap called for : '+ req.user.username);
    var moveDir = direction.direction;
    Locations.getPlayerByUsername(req.user.username, function(err, player){
      var pl_x = player.loc_x;
      var pl_y = player.loc_y;
      if(direction.name == req.user.username){
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
    Locations.checkLoc(pl_x, pl_y, function(err, found){
      if(found != null){
    Locations.updatePlayerLoc(req.user.username, pl_x, pl_y, function(err, callback){
      socket.emit('updateYourMap');
    });





    socket.broadcast.emit('updateYourMap');
  }
});
  }
});
});


socket.on('update_loc', function(data, type) {
    console.log(data);
     var Locxy = data.split(':');
    var locx = Locxy[0];
    var locy = Locxy[1];

   Locations.updateLoc(locx, locy, type, function(err, callback){
    
  });
  socket.emit('updateYourMap');
     
});
  socket.on('create_loc', function(data, type) {
    console.log(type);

    var Locxy = data.split(':');
    var locx = Locxy[0];
    var locy = Locxy[1];

    Locations.createLoc(locx, locy, type, function(err, callback){
   
  });
   socket.emit('updateYourMap');
    
  });

  }); //end connection
  });//end render
module.exports = router;
