/* eslint-disable */
import {
  LOAD_FILM_REQUEST, LOAD_FILM_SUCCESS, LOAD_FILM_FAILURE,
  LOAD_FILM_CREDITS_REQUEST, LOAD_FILM_CREDITS_SUCCESS, LOAD_FILM_CREDITS_FAILURE
} from '../../constants'
var tmdbUrls = require('../../helpers/tmdb-urls').init('89a1a6500311a41b1a4c35541871e047').api_urls
import { format } from '../../helpers/TextHelper'
import promise from 'promise'
import _ from 'lodash'

export function loadFilm (slug) {
  const filmId = (slug || '').substring(0, (slug || '').indexOf('-'))
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest
    const films = (getState().films || {}).data || []
    const filmData = _.find(films, (film) => film.id == filmId)
    console.log(filmData)

    dispatch({ type: LOAD_FILM_REQUEST })
    return filmData ? 
      new promise((resolve, reject) => {
        dispatch( {
          type: LOAD_FILM_SUCCESS, 
          payload: filmData, 
          meta: {
            lastFetched: Date.now()
          }
        })
        dispatch(loadFilmCredits(slug))
      }) : 
      axios.get(`${protocol}://${host}/api/v0/films/${slug}`)
      .then(res => {
        dispatch({
          type: LOAD_FILM_SUCCESS,
          payload: res.data,
          meta: {
            lastFetched: Date.now()
          }
        })
        dispatch(loadFilmCredits(slug))
      })
      .catch(error => {
        console.error(`Error in reducer that handles ${LOAD_FILM_SUCCESS}: `, error)
        dispatch({
          type: LOAD_FILM_FAILURE,
          payload: error,
          error: true
        })
      })
  }
}

export function loadFilmCredits (slug) {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest
    // return axios.get(format(tmdbUrls.movie_casts, filmId))
    return axios.get(`${protocol}://${host}/api/v0/films/${slug}/credits`)
      .then(res => {

        dispatch({
          type: LOAD_FILM_CREDITS_SUCCESS,
          payload: res.data,
          meta: {
            lastFetched: Date.now()
          }
        })
      })
      .catch(error => {
        console.error(`Error in reducer that handles ${LOAD_FILM_SUCCESS}: `, error)
        dispatch({
          type: LOAD_FILM_CREDITS_FAILURE,
          payload: error,
          error: true
        })
      })
  }
}
