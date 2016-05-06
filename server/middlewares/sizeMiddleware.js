var SizeModel = require('server/models/SizeModel');
var config = require('server/config/main');

module.exports = {
    getById: function(request, response, next) {
        SizeModel.findOne({'_id': request.body._id, 'is_deleted': false}, {'created_at': false, 'updated_at': false, '__v': false}, function(error, size) {
            if (error || !size) return response.json(config.systemError);

            return response.json({'status': 'ok', 'result': {'size': size}});
        });
    },
    getAll: function(request, response, next) {
        SizeModel.find({'is_deleted': false})
            .select({'created_at': false, 'updated_at': false, '__v': false})
            .sort({'created_at': -1})
            .populate({
                path: 'models',
                select: {'created_at': false, 'updated_at': false, '__v': false}
            })
            .exec(function(error, sizes) {
                if (error || !sizes) return response.json(config.systemError);

                return response.json({'status': 'ok', 'result': {'sizes': sizes}});
            });
    },
    delete: function(request, response, next) {
        SizeModel.findOne({'_id': request.body._id, 'is_deleted': false}, {'created_at': false, 'updated_at': false, '__v': false}, function(error, size) {
            if (error || !size) return response.json(config.systemError);

            size.is_deleted = true;
            size.save(function(error) {
                if (error) return response.json(config.systemError);

                return response.json({'status': 'ok', 'result': {'msg': '尺寸刪除成功'}});
            });
        });
    },
    create: function(request, response, next) {
        var body = request.body;

        request.sanitizeBody('size').toFloat();
        request.sanitizeBody('for_baseball').toInt();
        request.sanitizeBody('for_softball').toInt();

        request.checkBody('size', '此欄位不可為空白').notEmpty();
        request.checkBody('models', '此欄位不可為空白').notEmptyArray();
        request.checkBody('for_baseball', '此欄位不可為空白').notEmpty();
        request.checkBody('for_baseball', '此欄位的值不正確').isIn(config.recommendationLevel);
        request.checkBody('for_softball', '此欄位不可為空白').notEmpty();
        request.checkBody('for_softball', '此欄位的值不正確').isIn(config.recommendationLevel);

        request.asyncValidationErrors()
            .then(function() {
                var sizeObject = new SizeModel();

                sizeObject.size = body.size;
                sizeObject.models = body.models;
                sizeObject.for_baseball = body.for_baseball;
                sizeObject.for_softball = body.for_softball;
                sizeObject.is_deleted = false;
                sizeObject.save(function(error) {
                    if (error) return response.json(config.systemError);

                    return response.json({'status': 'ok', 'result': {'msg': '尺寸新增成功'}});
                });
            })
            .catch(function(errors) {
                return response.json({'status': 'error', 'result': {'errorCode': 7, 'errorMsg': '尺寸或刀模種類或棒壘球用請正確填寫'}});
            });
    },
    update: function(request, response, next) {
        var body = request.body;

        request.sanitizeBody('size').toFloat();
        request.sanitizeBody('for_baseball').toInt();
        request.sanitizeBody('for_softball').toInt();

        request.checkBody('size', '此欄位不可為空白').notEmpty();
        request.checkBody('models', '此欄位不可為空白').notEmptyArray();
        request.checkBody('for_baseball', '此欄位不可為空白').notEmpty();
        request.checkBody('for_baseball', '此欄位的值不正確').isIn(config.recommendationLevel);
        request.checkBody('for_softball', '此欄位不可為空白').notEmpty();
        request.checkBody('for_softball', '此欄位的值不正確').isIn(config.recommendationLevel);

        request.asyncValidationErrors()
            .then(function() {
                SizeModel.findOne({'_id': body._id, 'is_deleted': false}, {'created_at': false, 'updated_at': false, '__v': false}, function(error, sizeObject) {
                    if (error || !sizeObject) return response.json(config.systemError);

                    sizeObject.size = body.size;
                    sizeObject.models = body.models;
                    sizeObject.for_baseball = body.for_baseball;
                    sizeObject.for_softball = body.for_softball;
                    sizeObject.is_deleted = false;
                    sizeObject.save(function(error) {
                        if (error) return response.json(config.systemError);

                        return response.json({'status': 'ok', 'result': {'msg': '尺寸更新成功'}});
                    });
                });
            })
            .catch(function(errors) {
                return response.json({'status': 'error', 'result': {'errorCode': 7, 'errorMsg': '尺寸或刀模種類或棒壘球用請正確填寫'}});
            });
    }
};
