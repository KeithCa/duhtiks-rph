var express = require('express');
var router = express.Router();


router.get('/', function(req, res){
	res.render('location', {
});
var io = req.app.get('socketio');
io.on('connection', function(socket){
  console.log('hello');

});


});



module.exports = router;
