var LocalStrategy = require('passport-local').Strategy;
var UserModel = require('server/models/UserModel');
var config = require('server/config/main');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        return done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        UserModel.findById(id, function(error, user) {
            return done(error, user);
        });
    });

    passport.use('login', new LocalStrategy({usernameField: 'email', passwordField: 'password', passReqToCallback: true}, function(request, email, password, done) {
        process.nextTick(function() {
            console.log("Email::" + email);
            UserModel.findOne({'email': email}, function(error, user) {
                if (error) return done(config.systemError);

                if (!user) return done({'status': 'error', 'result': {'errorCode': 2, 'errorMsg': 'Email不正確'}});

                if (!user.validPassword(password)) return done({'status': 'error', 'result': {'errorCode': 2, 'errorMsg': 'Password不正確'}});

                return done(null, user);
            });
        });
    }));

    return {
        login: function(request, response, next) {
            passport.authenticate('login', function(error, user) {
                if (error) return response.json(error);

                request.login(user, function(error) {
                    if (error) return response.json({'status': 'error', 'result': {'errorMsg': config.systemError}});

                    return response.json({'status': 'ok', 'result': {'token': user.generateJWT()}});
                });
            })(request, response, next);
        }
    };
};
