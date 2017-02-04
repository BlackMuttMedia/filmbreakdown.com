var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt'),
	SALT_WORK_FACTOR = 10;

var UserDetail = new Schema({
    _id: { type: Schema.Types.ObjectId },
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true, index: { unique: true } },
    username: { type: String, required: true, index: { unique: true } },
    username_lower: {type: String},
    firstName_lower: {type: String},
    lastName_lower: {type: String},
    email_lower: {type: String},
    password: { type: String, required: true }
  }, {
    collection: 'userInfo'
  });

UserDetail.pre('save', function(next) {
    var user = this;

    user.username_lower = (user.username || '').toLowerCase();
    user.firstName_lower = (user.firstName || '').toLowerCase();
    user.lastName_lower = (user.lastName || '').toLowerCase();
    user.email_lower = (user.email || '').toLowerCase();

	// only hash the password if it has been modified (or is new)
	if (!user.isModified('password')) return next();

	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
	    if (err) return next(err);

	    // hash the password using our new salt
	    bcrypt.hash(user.password, salt, function(err, hash) {
	        if (err) return next(err);

	        // override the cleartext password with the hashed one
	        user.password = hash;
	        next();
	    });
	});


});

UserDetail.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};

UserDetail.methods.updatePassword = function(oldPassword, newPassword, cb) {
    this.comparePassword(oldPassword, function(err, isMatch) {
    	if(err) return cb(err);

    })
};

module.exports = UserDetail;