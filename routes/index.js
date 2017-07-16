var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index', {
	username : req.user.name // get the user out of session and pass to template
	//can use res.send(); either
});
	console.log("Trying to figure out session variables here" + req.user.name);

	//this holds the full session variables to get user name it is be req.user.id
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;
