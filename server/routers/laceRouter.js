var tokenMiddleware = require('server/middlewares/tokenMiddleware');
var laceMiddleware = require('server/middlewares/laceMiddleware');

module.exports = function(express) {
    var router = express.Router();

    router.post('/backend/lace/getAll', tokenMiddleware.verify, laceMiddleware.getAll);

    router.post('/backend/lace/create', tokenMiddleware.verify, laceMiddleware.create);

    router.post('/backend/lace/update', tokenMiddleware.verify, laceMiddleware.update);

    return router;
};
