var mongoose = require('mongoose');
var timeBehavior = require('server/plugins/timeBehavior');

var LeatherSchema = mongoose.Schema({
    title: String,
    img: String,
    description: String,
    colors: [{
        _id: {type: mongoose.Schema.Types.ObjectId, ref: 'Color'},
        colorTitle: String,
        colorCode: String
    }]
}, {collection: 'leather'});

LeatherSchema.plugin(timeBehavior);

module.exports = mongoose.model('Leather', LeatherSchema);
