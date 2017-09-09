import { Router } from 'express'
import axios from 'axios'
import util from 'util'
import mongoose from 'mongoose'
import GenreDescriptionSchema from './models/GenreDescriptionSchema'
import config from '../config'
import { init } from '../../common/tmdb-urls' 

const router = new Router()
const tmdbUrls = init(config.tmdb_key).api_urls
let films = []

router.get('/', (req, res) => {
  axios.get(util.format(tmdbUrls.misc_popular, 1))
    .then((response) => {
      res.status(200).json(response.data)
    })
})

router.get('/page/:slug', (req, res) => {
  axios.get(util.format(tmdbUrls.misc_popular, req.params.slug))
    .then((response) => {
      res.status(200).json(response.data)
    })
})

router.get('/:slug', (req, res) => {
  const id = (req.params.slug || '').substring(0, req.params.slug.indexOf('-'))

  axios.get(util.format(tmdbUrls.movie_info, id))
    .then((response) => {
      res.status(200).json(response.data)
    })
  /*const index = _.findIndex(films(), el => el.id == id)
  if (index < 0) {
    res.status(404).json({
      error: 'Post does not exist in db'
    })
  }

  setTimeout(() => {
    res.status(200).json(films()[index])
  }, 300)*/
})

router.get('/:slug/credits', (req, res) => {
  const id = (req.params.slug || '').substring(0, req.params.slug.indexOf('-'))

  axios.get(util.format(tmdbUrls.movie_casts, id))
    .then((response) => {
      res.status(200).json(response.data)
    })
  /*const index = _.findIndex(films(), el => el.id == id)
  if (index < 0) {
    res.status(404).json({
      error: 'Post does not exist in db'
    })
  }

  setTimeout(() => {
    res.status(200).json(films()[index])
  }, 300)*/
})

module.exports = router
