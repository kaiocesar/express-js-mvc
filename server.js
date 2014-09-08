// ./server.js

var express = require('express')
  , path = require('path')
  , swig = require('swig')
  , mongoose = require('mongoose')
  , configsDB = require('./configs/database')
  , passport = require('passport')
  , session  = require('express-session')
  , flash = require('connect-flash')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , app = express();


// mongoose connect 
mongoose.connect(configsDB.url);


// Passport 
require('./configs/passport')(passport);


// settings 
app.set('port', process.env.PORT || 1337);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname + "/public")));

// View engine
app.engine('html',swig.renderFile);
app.set('view engine','html');
app.set('views', __dirname + '/app/views');
app.set('view cache', false);
swig.setDefaults({cache: false});


// require passport 
app.use(session({
	secret : '356e166b30cfd4c4f2c484d674211ffe',
	saveUninitialized : true,
	resave : true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// load routes
require('./configs/routes')(app);


// launch
app.listen(app.get('port'), function(){
	console.log('Listen on port: ' + app.get('port'));
});


module.exports = app;