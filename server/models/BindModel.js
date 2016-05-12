var mongoose = require('mongoose');
var timeBehavior = require('server/plugins/timeBehavior');

var BindSchema = mongoose.Schema({

    bind_colors: [{type: mongoose.Schema.Types.ObjectId, ref: 'Color'}]

}, {collection: 'bind'});

BindSchema.plugin(timeBehavior);

module.exports = mongoose.model('Bind', BindSchema);
