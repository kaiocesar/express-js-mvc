// ./app/controllers/home.js

// Home Controller

module.exports = function(app) {

	var HomeController = {

		index : function (req, res) {
			res.render('front/home');
		}
	};

	return HomeController;

};
	
