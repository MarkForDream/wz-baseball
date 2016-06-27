var tokenMiddleware = require('server/middlewares/tokenMiddleware');
var webMiddleware = require('server/middlewares/webMiddleware');

module.exports = function(express) {
    var router = express.Router();

    router.post('/backend/web/getAll', tokenMiddleware.verify, webMiddleware.getAll);

    router.post('/backend/web/delete', tokenMiddleware.verify, webMiddleware.delete);

    router.post('/backend/web/create', tokenMiddleware.verify, webMiddleware.create);

    return router;
};
