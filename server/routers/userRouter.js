var userMiddleware = require('server/middlewares/userMiddleware');

module.exports = function(express, passport) {
    var router = express.Router();

    router.post('/backend/login', userMiddleware.login, passport.login);

    return router;
};
