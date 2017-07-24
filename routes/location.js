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
  console.log('Someone connected to us');

  socket.on('getMap', function(){
   Locations.getPlayerByUsername(req.user.username, function(err, player){
    var pl_x = player.loc_x;
    var pl_y = player.loc_y;
   Locations.getLocByxy(pl_x, pl_y, function(err, result){
    console.log(result);
   socket.emit('heresTheMap', {loc_info: result, pl_info:player});
    console.log(result[1]);
  });
  });
  });
});
});
module.exports = router;