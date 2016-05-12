var async = require('async');
var jsonwebtoken = require('jsonwebtoken');
var UserModel = require('server/models/UserModel');
var config = require('server/config/main');

module.exports = {
    verify: function(request, response, next) {
        async.waterfall(
            [
                function(done) {
                    var token = request.body.token;
                    if (!token) done(config.accessError);
                    else done(null, token);
                },
                function(token, done) {
                    jsonwebtoken.verify(token, config.tokenSecret, function(error, data) {
                        if (error) done(config.accessError);
                        else done(null, data);
                    });
                },
                function(data, done) {
                    UserModel.findOne({'email': data.email}, function(error, user) {
                        if (error || !user) done(config.accessError);
                        else done(null);
                    });
                }
            ],
            function(error) {
                if (error) return response.json(error);
                return next();
            }
        );
    }
};
