var express = require('express');
var ejs = require('ejs');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var spells = require('./scripts/spells')

var url = 'mongodb://itadaki33:keith7195@grpg-shard-00-00-u6pl7.mongodb.net:27017,grpg-shard-00-01-u6pl7.mongodb.net:27017,grpg-shard-00-02-u6pl7.mongodb.net:27017/GRPG?ssl=true&replicaSet=GRPG-shard-0&authSource=admin';

mongoose.connect(url);
var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');
var location = require('./routes/location');
var builder = require('./routes/builder');
// Init App
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);


// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));


// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});



app.use('/', routes);
app.use('/users', users);
app.use('/location', location);
app.use('/builder', builder);

// Set Port
app.set('port', (process.env.PORT || 3000));

var server = app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
//  console.log('In index firebolt test' +spells.spells.firebolt.name)
});

global.io = require('socket.io')(server);
app.set('socketio', io);
