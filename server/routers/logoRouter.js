var tokenMiddleware = require('server/middlewares/tokenMiddleware');
var logoMiddleware = require('server/middlewares/logoMiddleware');

module.exports = function(express) {
    var router = express.Router();

    router.post('/backend/logo/getById', tokenMiddleware.verify, logoMiddleware.getById);

    router.post('/backend/logo/getAll', tokenMiddleware.verify, logoMiddleware.getAll);

    router.post('/backend/logo/delete', tokenMiddleware.verify, logoMiddleware.delete);

    router.post('/backend/logo/create', tokenMiddleware.verify, logoMiddleware.create);

    router.post('/backend/logo/update', tokenMiddleware.verify, logoMiddleware.update);

    return router;
};
