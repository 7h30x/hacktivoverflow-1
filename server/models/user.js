const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var emailRegex = new RegExp("^.+@[^\.].*\.[a-z]{2,}$");

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: val => (emailRegex.test(val))
    }
  },
  password: {
    type: String,
    required: true,
    maxlength: 100
  },
  firstName: String,
  lastName: String,
  watched_tags: [String],
})


//HASH USER PASSWORD ON CREATE NEW USER
userSchema.pre('save', function (next) {
  let self = this;
  if(!this.isModified('password')) return next();
  bcrypt.genSalt(12, function(err, salt) {
    if (err) return next(err);
    // hash the password along with our new salt
    bcrypt.hash(self.password, salt, function(err, hash) {
      if (err) return next(err);
      self.password = hash;
      next();
    });
  });
})


//CHECK USER PASSWORD ON SIGN IN 
userSchema.methods.comparePassword = function(candidatePwd) {
  return bcrypt.compare(candidatePwd, this.password);
}
const User = mongoose.model('User', userSchema);
module.exports = User;