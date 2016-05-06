var mongoose = require('mongoose');
var timeBehavior = require('server/plugins/timeBehavior');

var BindSchema = mongoose.Schema({

    bind_color_index: {type: mongoose.Schema.Types.ObjectId, ref: 'Color'}

}, {collection: 'bind'});

BindSchema.plugin(timeBehavior);

module.exports = mongoose.model('Bind', BindSchema);
