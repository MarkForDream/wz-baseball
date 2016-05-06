var mongoose = require('mongoose');
var timeBehavior = require('server/plugins/timeBehavior');

var ColorSchema = mongoose.Schema({
    title: String,
    color_code: String,
    is_deleted: Boolean
}, {collection: 'color'});

ColorSchema.plugin(timeBehavior);

module.exports = mongoose.model('Color', ColorSchema);
