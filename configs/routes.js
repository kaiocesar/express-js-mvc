// ./configs/routes

module.exports = function(app, passport) {

	var home = require('../app/controllers/home')(app);
	var dashboard = require('../app/controllers/dashboard')(app);
	var profile = require('../app/controllers/profile')(app);


	//routes
	app.get ('/', home.index);
	app.get('/dashboard', isLoggerIn, dashboard.index);
	app.get('/dashboard/profile', isLoggerIn, profile.index);
	app.get('/dashboard/profile/add', profile.add);
	app.get('/dashboard/settings', isLoggerIn, dashboard.settings);


	// authenticate
	app.get('/logout', dashboard.logout);
	app.get('/login', function(req, res){
		res.send('<h1>Login is required</h1>');
	});

	app.post('/upload', profile.upload);

};


function isLoggerIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/login');
}