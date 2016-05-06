var tokenMiddleware = require('server/middlewares/tokenMiddleware');
var modelMiddleware = require('server/middlewares/modelMiddleware');

module.exports = function(express) {
    var router = express.Router();

    router.post('/backend/model/getById', tokenMiddleware.verify, modelMiddleware.getById);

    router.post('/backend/model/getAll', tokenMiddleware.verify, modelMiddleware.getAll);

    router.post('/backend/model/delete', tokenMiddleware.verify, modelMiddleware.delete);

    router.post('/backend/model/create', tokenMiddleware.verify, modelMiddleware.create);

    router.post('/backend/model/update', tokenMiddleware.verify, modelMiddleware.update);

    return router;
};
