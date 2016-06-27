var mongoose = require('mongoose');
var timeBehavior = require('server/plugins/timeBehavior');

var LogoSchema = mongoose.Schema({
    title: String,
    img: String,
    description: String,
    is_deleted: Boolean
}, {collection: 'logo'});

LogoSchema.plugin(timeBehavior);

module.exports = mongoose.model('Logo', LogoSchema);
