var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var gameSchema = new Schema({
    name:      { type: String },
    platform:  { type: String, enum: ['Xbox360', 'PS3', 'PC'] }
});

module.exports = mongoose.model('Game', gameSchema);
