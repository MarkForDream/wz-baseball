var LeatherModel = require('server/models/LeatherModel');
var config = require('server/config/main');

module.exports = {
    getById: function(request, response, next) {
        LeatherModel.findOne({
                '_id': request.body._id,
                'is_deleted': false
            })
            .select({
                'created_at': false,
                'updated_at': false,
                '__v': false
            })
            .populate({
                path: 'colors',
                match: {
                    is_deleted: false
                }
            })
            .exec(function(error, leather) {
                if (error) return response.json(config.systemError);

                return response.json({
                    'status': 'ok',
                    'result': {
                        'leather': leather
                    }
                });
            });
    },
    getAll: function(request, response, next) {
        LeatherModel.find({
                'is_deleted': false
            })
            .select({
                'created_at': false,
                'updated_at': false,
                '__v': false
            })
            .sort({
                'created_at': -1
            })
            .populate({
                path: 'colors',
                match: {
                    is_deleted: false
                }
            })
            .exec(function(error, leathers) {
                if (error) return response.json(config.systemError);

                return response.json({
                    'status': 'ok',
                    'result': {
                        'leathers': leathers
                    }
                });
            });
    },
    delete: function(request, response, next) {
        LeatherModel.findOne({
                '_id': request.body._id,
                'is_deleted': false
            })
            .select({
                'created_at': false,
                'updated_at': false,
                '__v': false
            })
            .exec(function(error, leather) {

                if (error || !leather) return response.json(config.systemError);

                leather.is_deleted = true;
                leather.save(function(error) {
                    if (error) return response.json(config.systemError);
                    return response.json({
                        'status': 'ok',
                        'result': {
                            'msg': '皮革刪除成功'
                        }
                    });
                });
            });
    },
    create: function(request, response, next) {
        var body = request.body;

        request.sanitizeBody('title').toString();
        request.sanitizeBody('img').toString();
        request.sanitizeBody('description').toString();

        request.checkBody('title', '此欄位不可為空白').notEmpty();
        request.checkBody('img', '此欄位不可為空白').notEmpty();
        request.checkBody('img', '圖片格式請正確上傳').validateImg();

        request.asyncValidationErrors()
            .then(function() {
                var leather = new LeatherModel();
                // console.log("body:::" + JSON.stringify(body));
                leather.title = body.title;
                leather.img = body.img;
                leather.description = body.description || '';
                leather.is_deleted = false;
                leather.colors = [];
                body.selectedColors.map(function(selectedColor) {
                    leather.colors.push({
                        _id: selectedColor._id
                    });
                });

                leather.save(function(error) {
                    if (error) {

                        return response.json(config.systemError);
                    }
                    return response.json({
                        'status': 'ok',
                        'result': {
                            'msg': '皮革新增成功'
                        }
                    });
                });
            })
            .catch(function(errors) {
                return response.json({
                    'status': 'error',
                    'result': {
                        'errorCode': 5,
                        'errorMsg': '標題或圖片請正確填寫'
                    }
                });
            });
    },
    update: function(request, response, next) {
        var body = request.body;

        request.sanitizeBody('title').toString();
        request.sanitizeBody('img').toString();
        request.sanitizeBody('description').toString();

        request.checkBody('title', '此欄位不可為空白').notEmpty();
        request.checkBody('img', '此欄位不可為空白').notEmpty();
        request.checkBody('img', '圖片格式請正確上傳').validateImg();

        request.asyncValidationErrors()
            .then(function() {
                LeatherModel.findOne({
                    '_id': request.body._id,
                    'is_deleted': false
                }, function(error, leather) {
                    if (error) return response.json(config.systemError);

                    leather.title = body.title;
                    leather.img = body.img;
                    leather.description = body.description || '';
                    leather.is_deleted = false;
                    leather.colors = [];
                    body.selectedColors.map(function(selectedColor) {
                        leather.colors.push({
                            _id: selectedColor._id
                        });
                    });

                    leather.save(function(error) {
                        if (error) return response.json(config.systemError);

                        return response.json({
                            'status': 'ok',
                            'result': {
                                'msg': '皮革更新成功'
                            }
                        });
                    });
                });
            })
            .catch(function(errors) {
                return response.json({
                    'status': 'error',
                    'result': {
                        'errorCode': 4,
                        'errorMsg': '標題或圖片請正確填寫'
                    }
                });
            });
    }
};
