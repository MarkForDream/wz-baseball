var BindModel = require('server/models/BindModel');
var config = require('server/config/main');

module.exports = {
    // TODO: should be modified using aggregate: http://mongoosejs.com/docs/populate.html
    getAll: function(request, response, next) {
        BindModel.find({})
            .sort('-created_at')
            .populate({
                path: 'bind_color_index',
                select: 'title color_code'
            })
            .exec(function(err, bindColors) {
                if (err) return response.json(config.systemError);
                return response.json({
                    'status': 'ok',
                    'result': {
                        'bindColors': bindColors
                    }
                });
            });
    },
    create: function(request, response, next) {
        var body = request.body;

        var selectedColorIds = [];
        body.selectedColors.map(function(selectedColorId) {
            selectedColorIds.push({
                bind_color_index: selectedColorId
            });
        });
        BindModel.create(selectedColorIds, function(err) {
            if (err) {
                return response.json(config.systemError);
            }
            return response.json({
                'status': 'ok',
                'result': {
                    'msg': '滾邊顏色新增成功'
                }
            });
        });

    }
    // update: function(request, response, next) {
    //     var body = request.body;
    //
    //     request.sanitizeBody('title').toString();
    //     request.sanitizeBody('img').toString();
    //     request.sanitizeBody('description').toString();
    //
    //     request.checkBody('title', '此欄位不可為空白').notEmpty();
    //     request.checkBody('img', '此欄位不可為空白').notEmpty();
    //     request.checkBody('img', '圖片格式請正確上傳').validateImg();
    //
    //     request.asyncValidationErrors()
    //         .then(function() {
    //             LeatherModel.findById(request.body._id, function(error, leather) {
    //                 if (error) return response.json(config.systemError);
    //
    //                 leather.title = body.title;
    //                 leather.img = body.img;
    //                 leather.description = body.description || '';
    //
    //                 leather.colors = [];
    //                 body.selectedColors.map(function(selectedColor) {
    //                     leather.colors.push({
    //                         _id: selectedColor._id
    //                     });
    //                 });
    //
    //                 leather.save(function(error) {
    //                     if (error) return response.json(config.systemError);
    //
    //                     return response.json({
    //                         'status': 'ok',
    //                         'result': {
    //                             'msg': '皮革更新成功'
    //                         }
    //                     });
    //                 });
    //             });
    //         })
    //         .catch(function(errors) {
    //             return response.json({
    //                 'status': 'error',
    //                 'result': {
    //                     'errorCode': 4,
    //                     'errorMsg': '標題或圖片請正確填寫'
    //                 }
    //             });
    //         });
    // }
};
