var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var GenreSchema = new Schema({
		id: { type: Number, required: true },
		name: { type: String, required: true },
  }, {
    collection: 'genreInfo'
  });

var GenreModel = mongoose.model('genreInfo', GenreSchema);

GenreSchema.pre('save', function(next) {
    var genre = this;

    genre.name_lower = (genre.name || '').toLowerCase();
    genre.name_key = (genre.name_lower || '').replace(/\s/g, '-');

    GenreModel.find({ id: genre.id }, function(err, genres) {
      if(!genres.length) {
        next();
      }
      else {
        next(new Error("Genre Exists"));
      }
    });
});

module.exports = GenreSchema;