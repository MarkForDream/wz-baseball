var mongoose = require('mongoose');
var timeBehavior = require('server/plugins/timeBehavior');

var SizeSchema = mongoose.Schema({
    size: Number,
    models: [{type: mongoose.Schema.Types.ObjectId, ref: 'Model'}],
    for_baseball: Number,
    for_softball: Number,
    is_deleted: Boolean
}, {collection: 'size'});

SizeSchema.plugin(timeBehavior);

module.exports = mongoose.model('Size', SizeSchema);
