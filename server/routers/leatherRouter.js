var tokenMiddleware = require('server/middlewares/tokenMiddleware');
var leatherMiddleware = require('server/middlewares/leatherMiddleware');

module.exports = function(express) {
    var router = express.Router();

    router.post('/backend/leather/getById', tokenMiddleware.verify, leatherMiddleware.getById);

    router.post('/backend/leather/getAll', tokenMiddleware.verify, leatherMiddleware.getAll);

    router.post('/backend/leather/delete', tokenMiddleware.verify, leatherMiddleware.delete);

    router.post('/backend/leather/create', tokenMiddleware.verify, leatherMiddleware.create);

    router.post('/backend/leather/update', tokenMiddleware.verify, leatherMiddleware.update);

    return router;
};
