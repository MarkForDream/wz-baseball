var ColorModel = require('server/models/ColorModel');
var config = require('server/config/main');

module.exports = {
    getById: function(request, response, next) {
        ColorModel.findById(request.body._id, {'created_at': false, 'updated_at': false, '__v': false}, function(error, color) {
            if (error) return response.json(config.systemError);

            return response.json({'status': 'ok', 'result': {'color': color}});
        });
    },
    getAll: function(request, response, next) {
        ColorModel.find({}, {'created_at': false, 'updated_at': false, '__v': false}, {'sort': {'created_at': -1}}, function(error, colors) {
            if (error) return response.json(config.systemError);

            return response.json({'status': 'ok', 'result': {'colors': colors}});
        });
    },
    delete: function(request, response, next) {
        ColorModel.remove({'_id': request.body._id}, function(error) {
            if (error) return response.json(config.systemError);

            return response.json({'status': 'ok', 'result': {'msg': '顏色刪除成功'}});
        });
    },
    create: function(request, response, next) {
        var body = request.body;

        request.sanitizeBody('title').toString();
        request.sanitizeBody('color_code').toString();

        request.checkBody('title', '此欄位不可為空白').notEmpty();
        request.checkBody('color_code', '此欄位不可為空白').notEmpty();

        request.asyncValidationErrors()
            .then(function() {
                var color = new ColorModel();

                color.title = body.title;
                color.color_code = body.color_code;
                color.save(function(error) {
                    if (error) return response.json(config.systemError);

                    return response.json({'status': 'ok', 'result': {'msg': '顏色新增成功'}});
                });
            })
            .catch(function(errors) {
                return response.json({'status': 'error', 'result': {'errorCode': 4, 'errorMsg': '標題或色碼請正確填寫'}});
            });
    },
    update: function(request, response, next) {
        var body = request.body;

        request.sanitizeBody('title').toString();
        request.sanitizeBody('color_code').toString();

        request.checkBody('title', '此欄位不可為空白').notEmpty();
        request.checkBody('color_code', '此欄位不可為空白').notEmpty();

        request.asyncValidationErrors()
            .then(function() {
                ColorModel.findById(body._id, function(error, color) {
                    if (error || !color) return response.json(config.systemError);

                    color.title = body.title;
                    color.color_code = body.color_code;
                    color.save(function(error) {
                        if (error) return response.json(config.systemError);

                        return response.json({'status': 'ok', 'result': {'msg': '顏色更新成功'}});
                    });
                });
            })
            .catch(function(errors) {
                return response.json({'status': 'error', 'result': {'errorCode': 4, 'errorMsg': '標題或色碼請正確填寫'}});
            });
    }
};
