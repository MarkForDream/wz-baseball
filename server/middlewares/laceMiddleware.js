var LaceModel = require('server/models/LaceModel');
var config = require('server/config/main');

module.exports = {
    // TODO: should be modified using aggregate: http://mongoosejs.com/docs/populate.html
    getAll: function(request, response, next) {
        LaceModel.findOne()
            // .sort('-created_at')
            .populate('lace_colors.color_id')
            .exec(function(err, laceColors) {
                if (err) return response.json(config.systemError);
                return response.json({
                    'status': 'ok',
                    'result': {
                        'laceColors': laceColors
                    }
                });
            });
    },
    create: function(request, response, next) {
        var body = request.body;
        var lace = new LaceModel();
        lace.lace_colors = JSON.parse(JSON.stringify(body.selectedColors));
        console.log("body.selectedColors:" + JSON.stringify(body.selectedColors));
        console.log("lace::" + JSON.stringify(lace));
        lace.save(function(err) {
            if (err) {
                console.log("err:" + JSON.stringify(err));
                return response.json(config.systemError);
            }
            return response.json({
                'status': 'ok',
                'result': {
                    'msg': '帶皮顏色新增成功'
                }
            });
        });
        // var selectedColorIds = [];
        // body.selectedColors.map(function(selectedColorId) {
        //     selectedColorIds.push({
        //         lace_color_index: selectedColorId
        //     });
        // });
        // laceModel.create(body.selectedColors, function(err) {
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

        LaceModel.findOne()
            .exec(function(error, lace) {
                if (error) return response.json(config.systemError);
                lace.lace_colors = body.selectedColors;

                lace.save(function(error) {
                    if (error) return response.json(config.systemError);

                    return response.json({
                        'status': 'ok',
                        'result': {
                            'msg': '帶皮顏色更新成功'
                        }
                    });
                });
            });

    }
};
