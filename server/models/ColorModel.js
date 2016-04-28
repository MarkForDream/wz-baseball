var mongoose = require('mongoose');
var timeBehavior = require('server/plugins/timeBehavior');

var ColorSchema = mongoose.Schema({
    title: String,
    color_code: String
}, {collection: 'color'});

ColorSchema.plugin(timeBehavior);

module.exports = mongoose.model('Color', ColorSchema);
