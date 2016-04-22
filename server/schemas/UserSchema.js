var mongoose = require('mongoose');
var jsonwebtoken = require('jsonwebtoken');
var bcryptNodejs = require('bcrypt-nodejs');
var timeBehavior = require('server/plugins/timeBehavior');

var UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
}, {collection: 'user'});

UserSchema.plugin(timeBehavior);

UserSchema.methods.generateHash = function(password) {
    return bcryptNodejs.hashSync(password, bcryptNodejs.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcryptNodejs.compareSync(password, this.password);
};

UserSchema.methods.generateJWT = function() {
    var today = new Date();
    var expiration = new Date(today);

    expiration.setDate(today.getDate() + 60);

    return jsonwebtoken.sign({
        _id: this._id,
        email: this.email,
        expiration: parseInt(exp.getTime() / 1000)
    }, 'WZBASEBALL');
};

module.exports = mongoose.model('User', UserSchema);
