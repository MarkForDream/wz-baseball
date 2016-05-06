var mongoose = require('mongoose');
var timeBehavior = require('server/plugins/timeBehavior');

var ModelSchema = mongoose.Schema({
    title: String,
    img: String,
    color: String,
    is_deleted: Boolean
}, {collection: 'model'});

ModelSchema.plugin(timeBehavior);

module.exports = mongoose.model('Model', ModelSchema);
