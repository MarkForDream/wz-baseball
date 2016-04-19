var config = require('server/config/main');
var mongoose = require('mongoose');

module.exports = {
    customValidators: {
        notequals: function(value, target) {
            if (value) return value !== target;

            return true;
        },
        maxlength: function(value, length) {
            if (value) return value.length <= length;

            return true;
        },
        minlength: function(value, length) {
            if (value) return value.length >= length;

            return true;
        },
        validateEmail: function(value) {
            if (value) return config.emailValidator.test(value);

            return true;
        },
        validateMongoId: function(value) {
            if (value) return mongoose.Types.ObjectId.isValid(value);

            return true;
        }
    }
};
