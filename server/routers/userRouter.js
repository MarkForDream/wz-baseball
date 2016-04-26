var userMiddleware = require('server/middlewares/userMiddleware');
var config = require('server/config/main');

module.exports = function(express, passport) {
    var router = express.Router();

    router.post('/backend/login', userMiddleware.login, passport.login);

    return router;
};
