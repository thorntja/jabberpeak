var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index:true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String
	},
	first_name: {
		type: String
	},
	last_name: {
		type: String
	},
	admin: {
		type: Boolean
	},
	phone: {
		type: String
	},
	Property: { type: mongoose.Schema.ObjectId, ref: 'Property' },
	appointments: [{ type: mongoose.Schema.ObjectId, ref: 'Appointment' }],
	balance: {
		type: Number
	},
	type: {
    type: String,
    default: 'users'
  }
});

//TO-DO weights and textScore (and add phone number search)
UserSchema.index({ username: 'text', first_name: 'text', last_name: 'text' });

// Virtual for user's full name
UserSchema
.virtual('name')
.get(function () {
  return this.first_name + this.last_name;
});

// Virtual for user's URL
UserSchema
.virtual('url')
.get(function () {
  return 'users/' + this._id;
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.updateUser = function(user, id, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(user.password, salt, function(err, hash) {
				user.password = hash;
				User.update({ _id: id }, user, callback);
	    });
	});
}

module.exports.getLoginByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
