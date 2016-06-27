var mongoose = require('mongoose');
var timeBehavior = require('server/plugins/timeBehavior');

var WebSchema = mongoose.Schema({
    img: String,
    priority: Number
}, {collection: 'web'});

WebSchema.plugin(timeBehavior);

module.exports = mongoose.model('Web', WebSchema);
