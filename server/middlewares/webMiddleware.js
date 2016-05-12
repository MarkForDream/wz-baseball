var WebModel = require('server/models/WebModel');
var config = require('server/config/main');

module.exports = {
    getAll: function(request, response, next) {
        WebModel.find({}, {'created_at': false, 'updated_at': false, '__v': false}, {'sort': {'priority': 1}}, function(error, webs) {
            if (error || !webs) return response.json(config.systemError);

            return response.json({'status': 'ok', 'result': {'webs': webs}});
        });
    },
    delete: function(request, response, next) {
        WebModel.remove({'_id': request.body._id}, function(error) {
            if (error) return response.json(config.systemError);

            return response.json({'status': 'ok', 'result': {'msg': '球檔示意圖刪除成功'}});
        });
    },
    create: function(request, response, next) {
        var body = request.body;

        request.checkBody('imgs', '此欄位不可為空白').notEmptyArray();
        request.checkBody('imgs', '圖片格式請正確上傳').validateImg();

        request.asyncValidationErrors()
            .then(function() {
                WebModel.count({}, function(error, value) {
                    if (error) return response.json(config.systemError);

                    var result = [];
                    var date = new Date();

                    body.imgs.forEach(function(img) {
                        result.push({'img': img, 'priority': ++value, 'created_at': date, 'updated_at': date});
                    });

                    WebModel.create(result, function(error) {
                        if (error) return response.json(config.systemError);

                        return response.json({'status': 'ok', 'result': {'msg': '球檔示意圖新增成功'}});
                    });
                });
            })
            .catch(function(errors) {
                return response.json({'status': 'error', 'result': {'errorCode': 8, 'errorMsg': '球檔示意圖請正確填寫'}});
            });
    }
};
