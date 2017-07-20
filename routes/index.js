var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index.ejs', {
	username : req.user.username // get the user out of session and pass to template
	//can use res.send(); either
});

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
