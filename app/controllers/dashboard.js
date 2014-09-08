
module.exports = function(app) {	

	var DashboardController = {
		index : function(req, res) {			
			res.render('dashboard/home');
		},
		profile : function(req, res) {
			res.render('dashboard/profile');
		},
		settings : function(req, res) {
			res.render('dashboard/settings');
		},
		logout : function(req, res) {
			res.redirect('/');
		}
	};

	return DashboardController;

};

