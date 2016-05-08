var mongoose = require('mongoose');
var timeBehavior = require('server/plugins/timeBehavior');

var LeatherSchema = mongoose.Schema({
    title: String,
    img: String,
    description: String,
    is_deleted: Boolean,
    colors: [{type: mongoose.Schema.Types.ObjectId, ref: 'Color'}]
}, {collection: 'leather'});

LeatherSchema.plugin(timeBehavior);

module.exports = mongoose.model('Leather', LeatherSchema);
