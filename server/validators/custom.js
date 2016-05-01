var config = require('server/config/main');
var mongoose = require('mongoose');
var validator = require('validator');

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
        },
        validateImg: function(value) {
            if (value) {
                var imgParser = value.split(',');

                if (imgParser.length === 2 && (imgParser[0] === 'data:image/jpeg;base64' || imgParser[0] === 'data:image/png;base64')) {
                    return validator.isBase64(imgParser[1]);
                }

            }

            return false;
        },
    }
};
