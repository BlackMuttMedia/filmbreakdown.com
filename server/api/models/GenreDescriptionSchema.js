var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var GenreDescriptionSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  genre_id: { type: Number, required: true },
  user_id: { type: Schema.Types.ObjectId },
  description: { type: String, required: true },
  date_added: { type: Date, default: Date.now },
}, {
  collection: 'genreDescriptions'
});

var GenreDescriptionModel = mongoose.model('genreDescriptions', GenreDescriptionSchema);

module.exports = GenreDescriptionSchema;