import { Router } from 'express'
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

module.exports = router
