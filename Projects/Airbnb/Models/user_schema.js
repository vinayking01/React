const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email : {
        type: String,
        required : true
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);

// First you need to plugin Passport-Local Mongoose into your User schema
// You're free to define your User how you like. 
// Passport-Local Mongoose will automatically add a username, hash and salt field to store the username, the hashed password and the salt value.
// Along with this also add some methods by default.
