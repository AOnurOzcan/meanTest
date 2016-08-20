// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String,
    profilePicture: String
  }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
