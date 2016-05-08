var BindModel = require('server/models/BindModel');
var config = require('server/config/main');

module.exports = {
    // TODO: should be modified using aggregate: http://mongoosejs.com/docs/populate.html
    getAll: function(request, response, next) {
        BindModel.findOne()
            // .sort('-created_at')
            .populate('bind_colors')
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
        var bind = new BindModel();
        bind.bind_colors = body.selectedColors;
        bind.save(function(err) {
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
        // var selectedColorIds = [];
        // body.selectedColors.map(function(selectedColorId) {
        //     selectedColorIds.push({
        //         bind_color_index: selectedColorId
        //     });
        // });
        // BindModel.create(body.selectedColors, function(err) {
        //     if (err) {
        //         return response.json(config.systemError);
        //     }
        //     return response.json({
        //         'status': 'ok',
        //         'result': {
        //             'msg': '滾邊顏色新增成功'
        //         }
        //     });
        // });

    },
    update: function(request, response, next) {
        var body = request.body;

        BindModel.findOne()
            .exec(function(error, bind) {
                if (error) return response.json(config.systemError);
                bind.bind_colors = body.selectedColors;

                bind.save(function(error) {
                    if (error) return response.json(config.systemError);

                    return response.json({
                        'status': 'ok',
                        'result': {
                            'msg': '滾邊顏色更新成功'
                        }
                    });
                });
            });

    }
};
