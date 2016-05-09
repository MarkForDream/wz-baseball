var tokenMiddleware = require('server/middlewares/tokenMiddleware');
var stitchingMiddleware = require('server/middlewares/stitchingMiddleware');

module.exports = function(express) {
    var router = express.Router();

    router.post('/backend/stitching/getAll', tokenMiddleware.verify, stitchingMiddleware.getAll);

    router.post('/backend/stitching/create', tokenMiddleware.verify, stitchingMiddleware.create);

    router.post('/backend/stitching/update', tokenMiddleware.verify, stitchingMiddleware.update);

    return router;
};
