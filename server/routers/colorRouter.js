var tokenMiddleware = require('server/middlewares/tokenMiddleware');
var colorMiddleware = require('server/middlewares/colorMiddleware');

module.exports = function(express) {
    var router = express.Router();

    router.post('/backend/color/getById', tokenMiddleware.verify, colorMiddleware.getById);

    router.post('/backend/color/getAll', tokenMiddleware.verify, colorMiddleware.getAll);

    router.post('/backend/color/delete', tokenMiddleware.verify, colorMiddleware.delete);

    router.post('/backend/color/create', tokenMiddleware.verify, colorMiddleware.create);

    router.post('/backend/color/update', tokenMiddleware.verify, colorMiddleware.update);

    return router;
};
