var mongoose = require('mongoose');
var timeBehavior = require('server/plugins/timeBehavior');

var LeatherSchema = mongoose.Schema({
    title: String,
    img: String,
    description: String
}, {collection: 'leather'});

LeatherSchema.plugin(timeBehavior);

module.exports = mongoose.model('Leather', LeatherSchema);
