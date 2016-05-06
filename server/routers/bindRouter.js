var tokenMiddleware = require('server/middlewares/tokenMiddleware');
var bindMiddleware = require('server/middlewares/bindMiddleware');

module.exports = function(express) {
    var router = express.Router();

    router.post('/backend/bind/getAll', tokenMiddleware.verify, bindMiddleware.getAll);

    router.post('/backend/bind/create', tokenMiddleware.verify, bindMiddleware.create);

    // router.post('/backend/leather/update', tokenMiddleware.verify, leatherMiddleware.update);

    return router;
};
