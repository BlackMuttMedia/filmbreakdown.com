import { Router } from 'express'
import _ from 'lodash'

const router = new Router()

// Remove this
import genres from '../genres.js'

const films = () => {
  return _.uniqBy(_.union.apply(null, _.map(genres.genres, (genre) => genre.films.results )), 'id')
}

router.get('/', (req, res) => {
  let returnFilms = {results: _.take(films(), 20)}
  setTimeout(() => {
    res.status(200).json(_.take(films(), 20))
  }, 300)
})

router.get('/:slug', (req, res) => {
  const id = (req.params.slug || '').substring(0, req.params.slug.indexOf('-'))

  const index = _.findIndex(films(), el => el.id == id)
  if (index < 0) {
    res.status(404).json({
      error: 'Post does not exist in db'
    })
  }

  setTimeout(() => {
    res.status(200).json(films()[index])
  }, 300)
})

module.exports = router
