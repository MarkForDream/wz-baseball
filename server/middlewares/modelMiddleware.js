var ModelModel = require('server/models/ModelModel');
var SizeModel = require('server/models/SizeModel');
var config = require('server/config/main');

module.exports = {
    getById: function(request, response, next) {
        ModelModel.findOne({'_id': request.body._id, 'is_deleted': false}, {'created_at': false, 'updated_at': false, '__v': false}, function(error, model) {
            if (error || !model) return response.json(config.systemError);

            return response.json({'status': 'ok', 'result': {'model': model}});
        });
    },
    getAll: function(request, response, next) {
        ModelModel.find({'is_deleted': false}, {'created_at': false, 'updated_at': false, '__v': false}, {'sort': {'created_at': -1}}, function(error, models) {
            if (error || !models) return response.json(config.systemError);

            return response.json({'status': 'ok', 'result': {'models': models}});
        });
    },
    delete: function(request, response, next) {
        SizeModel.findOne({'models': request.body._id, 'is_deleted': false}, {'created_at': false, 'updated_at': false, '__v': false}, function(error, size) {
            if (error) return response.json(config.systemError);

            if (size) {
                return response.json({'status': 'error', 'result': {'errorCode': 6, 'errorMsg': '有尺寸使用此刀模所以無法刪除'}});
            } else {
                ModelModel.findOne({'_id': request.body._id, 'is_deleted': false}, {'created_at': false, 'updated_at': false, '__v': false}, function(error, model) {
                    if (error || !model) return response.json(config.systemError);

                    model.is_deleted = true;
                    model.save(function(error) {
                        if (error) return response.json(config.systemError);

                        return response.json({'status': 'ok', 'result': {'msg': '刀模刪除成功'}});
                    });
                });
            }
        });
    },
    create: function(request, response, next) {
        var body = request.body;

        request.sanitizeBody('title').toString();
        request.sanitizeBody('img').toString();

        request.checkBody('title', '此欄位不可為空白').notEmpty();
        request.checkBody('img', '此欄位不可為空白').notEmpty();
        request.checkBody('img', '圖片格式請正確上傳').validateImg();

        request.asyncValidationErrors()
            .then(function() {
                var model = new ModelModel();

                model.title = body.title;
                model.img = body.img;
                model.color = body.color || '#ffffff';
                model.is_deleted = false;
                model.save(function(error) {
                    if (error) return response.json(config.systemError);

                    return response.json({'status': 'ok', 'result': {'msg': '刀模新增成功'}});
                });
            })
            .catch(function(errors) {
                return response.json({'status': 'error', 'result': {'errorCode': 6, 'errorMsg': '標題或圖片或顏色請正確填寫'}});
            });
    },
    update: function(request, response, next) {
        var body = request.body;

        request.sanitizeBody('title').toString();
        request.sanitizeBody('img').toString();

        request.checkBody('title', '此欄位不可為空白').notEmpty();
        request.checkBody('img', '圖片格式請正確上傳').validateImg();

        request.asyncValidationErrors()
            .then(function() {
                ModelModel.findOne({'_id': body._id, 'is_deleted': false}, {'created_at': false, 'updated_at': false, '__v': false}, function(error, model) {
                    if (error || !model) return response.json(config.systemError);

                    model.title = body.title;
                    model.img = body.img || model.img;
                    model.color = body.color || '#ffffff';
                    model.is_deleted = false;
                    model.save(function(error) {
                        if (error) return response.json(config.systemError);

                        return response.json({'status': 'ok', 'result': {'msg': '刀模更新成功'}});
                    });
                });
            })
            .catch(function(errors) {
                return response.json({'status': 'error', 'result': {'errorCode': 6, 'errorMsg': '標題或圖片或顏色請正確填寫'}});
            });
    }
};
