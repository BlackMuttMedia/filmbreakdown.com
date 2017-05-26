import { Router } from 'express'
import axios from 'axios'
import util from 'util'
import config from '../config'
import { init } from '../../common/tmdb-urls' 

const router = new Router()
const tmdbUrls = init(config.tmdb_key).api_urls

router.get('/', (req, res) => {
  axios.get(util.format(tmdbUrls.misc_now_playing, 1))
    .then((response) => {
      res.status(200).json(response.data)
    })
  /*setTimeout(() => {
    res.status(200).json(fakeDB)
  }, 300)*/
})

module.exports = router
