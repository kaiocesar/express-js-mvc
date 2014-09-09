// ./app/controllers/profile.js

// Profile controller

module.exports = function(app) {
	
	var ProfileController = {
		index : function(req, res) {
			res.render('dashboard/profile/index');
		},
		add : function(req, res) {
			res.render('dashboard/profile/add');
		},
		upload : function(req, res)	 {
			var formidable = require('formidable');
			var util = require('util');
			var fs = require('fs-extra');
			var qt = require('quickthumb');

			app.use(qt.static(__dirname + "/"));


			// formidable in action
			var form = new formidable.IncomingForm();
			form.parse(req, function(err, fields, files) {
				res.writeHead(200, {'content-type':'text/plain'});
				res.write('received upload:\n\n');
				res.end(util.inspect({fields: fields, files: files}));
			});

			form.on('end', function(fields, files){
				var temp_path = this.openedFiles[0].path;
				var file_name = this.openedFiles[0].name;
				var new_location = 'uploads/';
				
				fs.copy(temp_path, new_location + file_name, function(err){
					if (err) {
						console.log('Erro: ' + err);
					} else {
						console.log("Sucesso");
					}
				});

			});


		}
	};

	return ProfileController;
};

