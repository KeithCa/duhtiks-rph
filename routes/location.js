var express = require('express');
var router = express.Router();
var colors = {};
var model = require('../models/loc_model');
router.get('/', function(req, res){
	res.render('location', {
});
var io = req.app.get('socketio');
io.on('connection', function(socket){
  console.log('hello');
  socket.on('getMap', function(){
    socket.emit('heresTheMap', {map: model.map});
  });
  
  
  

});



});


 
  

module.exports = router;
