// ./app/models/user.js

// User model

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');


// Schema
var UserSchema = mongoose.Schema({
	local : {
		name : {type : String, default : '', trim : true},
		email : {type : String, default : '', trim : true},
		password : {type : String, default : '', trim : true},
		createAt : {type : Date, default : Date.now},
		status : {type: Boolean, default: false}
	}
});


// Methods
UserSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(0), null);
};

UserSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};


module.exports = mongoose.model("User", UserSchema);