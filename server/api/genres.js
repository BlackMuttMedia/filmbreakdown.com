import { Router } from 'express'
import mongoose from 'mongoose'
import GenreDescriptionSchema from './models/GenreDescriptionSchema'
const router = new Router()

// Remove this
import genres from '../genres.js'

router.get('/', (req, res) => {
  setTimeout(() => {
    res.status(200).json(genres.genres)
  }, 300)
})

router.get('/:slug', (req, res) => {
  const index = genres.genres.findIndex(el => el.name.toLowerCase() === req.params.slug.toLowerCase())
  if (index < 0) {
    res.status(404).json({
      error: 'Post does not exist in db'
    })
  }

  setTimeout(() => {
    res.status(200).json(genres.genres[index])
  }, 300)
})

router.get('/:slug/descriptions/*?', (req, res) => {
  var genreDescriptionSchema = mongoose.model('genreDescriptions', GenreDescriptionSchema);
  const index = genres.genres.findIndex(el => el.name.toLowerCase() === req.params.slug.toLowerCase())
  const paramsCount = req.params.length

  if (index < 0) {
    res.status(404).json({
      error: 'Post does not exist in db'
    })
  }

  const genre = genres.genres[index]
  const genre_id = genre.id
  const start = paramsCount > 0 ? req.params[0] : 0;
  const count = paramsCount > 1 ? req.params[1] : 10;

  const descriptions = genreDescriptionSchema.find({ 
  },
  [ 'date_added', 'description' ],
  {
    skip: start,
    limit: count,
    sort: {
      date_added: -1
    }
  },
  function(err, descriptions) {
    if(err)
    {
      res.json({ 'success' : false, 'error' : err });
    }
    else
    {
      res.json({ 'success' : true, 'error' : err, 'descriptions' : (descriptions || []) });
    }
  });
})

router.post('/descriptions/save', (req, res) => {
  var genreDescriptionSchema = mongoose.model('genreDescriptions', GenreDescriptionSchema);
  var newGenreDescription = new genreDescriptionSchema({
    genre_id: req.body.genre_id,
    user_id: req.body.user_id,
    description: req.body.description,
  });

  // save user to database
  newGenreDescription.save(function(err) {
    if (err) {
      console.log(err);
      res.send(400, 'Bad Request');
      //res.json({ 'success' : false, 'error' : err });
    }
    else {
      res.json({ 'success' : true, 'exists' : true, 'error' : undefined, 'comment' : newGenreDescription });
    }
  });
})

module.exports = router
