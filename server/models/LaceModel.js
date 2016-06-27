var mongoose = require('mongoose');
var timeBehavior = require('server/plugins/timeBehavior');

var LaceSchema = mongoose.Schema({

    lace_colors: [{
        color_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Color'
        },
        laceType: Number // 0: general, 1: white
    }]

}, {
    collection: 'lace'
});

LaceSchema.plugin(timeBehavior);

module.exports = mongoose.model('Lace', LaceSchema);
