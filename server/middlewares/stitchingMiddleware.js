var StitchingModel = require('server/models/StitchingModel');
var config = require('server/config/main');

module.exports = {
    // TODO: should be modified using aggregate: http://mongoosejs.com/docs/populate.html
    getAll: function(request, response, next) {
        StitchingModel.findOne()
            // .sort('-created_at')
            .populate('stitching_colors')
            .exec(function(err, stitchingColors) {
                console.log("err:" + err);
                console.log("stitchingColors:" + JSON.stringify(stitchingColors));
                if (err) return response.json(config.systemError);
                return response.json({
                    'status': 'ok',
                    'result': {
                        'stitchingColors': stitchingColors
                    }
                });
            });
    },
    create: function(request, response, next) {
        var body = request.body;
        var stitching = new StitchingModel();
        stitching.stitching_colors = body.selectedColors;
        stitching.save(function(err) {
            if (err) {
                return response.json(config.systemError);
            }
            return response.json({
                'status': 'ok',
                'result': {
                    'msg': '車縫顏色新增成功'
                }
            });
        });

    },
    update: function(request, response, next) {
        var body = request.body;

        StitchingModel.findOne()
            .exec(function(error, stitching) {
                if (error) return response.json(config.systemError);
                stitching.stitching_colors = body.selectedColors;

                stitching.save(function(error) {
                    if (error) return response.json(config.systemError);

                    return response.json({
                        'status': 'ok',
                        'result': {
                            'msg': '車縫顏色更新成功'
                        }
                    });
                });
            });

    }
};
