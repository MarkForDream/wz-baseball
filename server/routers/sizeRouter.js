var tokenMiddleware = require('server/middlewares/tokenMiddleware');
var sizeMiddleware = require('server/middlewares/sizeMiddleware');

module.exports = function(express) {
    var router = express.Router();

    router.post('/backend/size/getById', tokenMiddleware.verify, sizeMiddleware.getById);

    router.post('/backend/size/getAll', tokenMiddleware.verify, sizeMiddleware.getAll);

    router.post('/backend/size/delete', tokenMiddleware.verify, sizeMiddleware.delete);

    router.post('/backend/size/create', tokenMiddleware.verify, sizeMiddleware.create);

    router.post('/backend/size/update', tokenMiddleware.verify, sizeMiddleware.update);

    return router;
};
