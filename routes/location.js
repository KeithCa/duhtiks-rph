var express = require('express');
var router = express.Router();


router.get('/', function(req, res){
	res.render('location', {


});
	console.log("location" + req.user.username);


});



module.exports = router;
