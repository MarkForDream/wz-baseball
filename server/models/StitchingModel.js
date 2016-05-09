var mongoose = require('mongoose');
var timeBehavior = require('server/plugins/timeBehavior');

var StitchingSchema = mongoose.Schema({

    stitching_colors: [{type: mongoose.Schema.Types.ObjectId, ref: 'Color'}]

}, {collection: 'stitching'});

StitchingSchema.plugin(timeBehavior);

module.exports = mongoose.model('Stitching', StitchingSchema);
