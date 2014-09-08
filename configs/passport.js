// ./configs/passport.js

module.exports = function(passport) {

	var LocalStrategy = require('passport-local').Strategy;
	var User = require('../app/models/user');

	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err,user);
		});
	});

	passport.use('local-login', new LocalStrategy({
		usernameField : 'username',
		passwordField : 'password',
		passReqToCallback : true
	}, 
	function (req, email, password, done) {
		User.findOne({'local.email': email},function(err, user){
			if (err) {
				return done(err);
			}	 
			if (!user) {
				return done(null, false, req.flash('loginMessage','No user found.'));
			}
			if (!user.validPassword(password) ) {
				return done(null, false, req.flash('loginMessage','Password incorrect.'));
			}
			if (user.local.status == false) {
				return done(null, false, req.flash('loginMessage','Check your email registration confirmation.'))
			}

			return done(null, user);
		})
	}
	));

}