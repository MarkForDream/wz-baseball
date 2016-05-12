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
        notEmptyArray: function(value) {
            return (Object.prototype.toString.call(value) === '[object Array]') && value.length > 0;
        },
        validateEmail: function(value) {
            if (value) return config.emailValidator.test(value);

            return true;
        },
        validateMongoId: function(value) {
            if (Object.prototype.toString.call(value) === '[object String]') {
                return mongoose.Types.ObjectId.isValid(value);
            } else if (Object.prototype.toString.call(value) === '[object Array]') {
                value.forEach(function(item) {
                    if (!mongoose.Types.ObjectId.isValid(item)) return false;
                });
            }

            return true;
        },
        validateImg: function(value) {
            if (Object.prototype.toString.call(value) === '[object String]') {
                var imgParser = value.split(',');

                return (imgParser.length === 2 && (imgParser[0] === 'data:image/jpeg;base64' || imgParser[0] === 'data:image/png;base64') && validator.isBase64(imgParser[1]));
            } else if (Object.prototype.toString.call(value) === '[object Array]') {
                value.forEach(function(item) {
                    var imgParser = item.split(',');

                    if (!(imgParser.length === 2 && (imgParser[0] === 'data:image/jpeg;base64' || imgParser[0] === 'data:image/png;base64') && validator.isBase64(imgParser[1]))) return false;
                });
            }

            return true;
        },
    }
};
