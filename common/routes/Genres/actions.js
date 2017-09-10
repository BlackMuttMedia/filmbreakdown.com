/* eslint-disable */
import { 
  LOAD_GENRES_REQUEST, LOAD_GENRES_SUCCESS, LOAD_GENRES_FAILURE, LOAD_GENRES_CANCEL,
  LOAD_FILMS_REQUEST, LOAD_FILMS_SUCCESS, LOAD_FILMS_FAILURE 
} from '../../constants'
import _ from 'lodash'
import common_config from '../../common-config'
import { loadFilms } from '../Films/actions'
import { format } from '../../helpers/TextHelper'
import { GetBackdrop } from '../../helpers/FilmHelpers'
import { init } from '../../helpers/tmdb-urls'
import promise from 'promise'

let tmdbUrls = init(common_config.tmdb_key).api_urls
let genres = []

export function loadGenres () {
  // console.log('LOADING GENRES!!!!')
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest
    const genres = (getState().genres || {}).data
    const genresCount = (genres || []).length
    const films = (getState().films || {}).data
    const filmsCount = (films || []).length

    dispatch({ type: LOAD_GENRES_REQUEST })
    // dispatch(loadFilms())

    return genresCount > 0 ? 
      new promise((resolve, reject) => {
        dispatch({ 
          type: LOAD_GENRES_CANCEL, 
          meta: {
            isLoading: false,
          }
        })
        console.log('GENRES COUNT: ' + genresCount)
        if(filmsCount < 100) {
          genres.forEach((genre) => {
            //console.log(genre)
            //console.log(films)
            //console.log(getState().films)
            setTimeout(() => dispatch(loadGenreFilms(genre)), 100)
          })
        }
      }) : 
     axios.get(`${protocol}://${host}/api/v0/genres`)
      .then(res => {
        dispatch({
          type: LOAD_GENRES_SUCCESS,
          payload: res.data.genres,
          meta: {
            lastFetched: Date.now()
          }
        })

        res.data.genres.forEach((genre) => {
          genres[genre.name.toLowerCase()] = genre.id
          setTimeout(() => dispatch(loadGenreFilms(genre)), 100)
        })
      })
      .catch(error => {
        console.error(`Error in reducer that handles ${LOAD_GENRES_SUCCESS}: `, error)
        dispatch({
          type: LOAD_GENRES_FAILURE,
          payload: error,
          error: true
        })
      })
  }
}

export function loadGenreFilms(genre, page = 1) {
  // console.log('LOADING GENRE FILMS!!!!')
  return (dispatch, getState, { axios }) => {
    const genreId = genre.id
    const { protocol, host } = getState().sourceRequest
    const films = (getState().films || {}).data
    const backdrop = genre ? GetBackdrop(genre, films) : undefined
    if(!backdrop) {
      // console.log('Getting genre films for ' + genre.name + ' - ' + genre.id)
      // dispatch({ type: LOAD_FILMS_REQUEST })
      const genre_id_url = common_config.local ? `${protocol}://${host}/api/v0/genres/${genreId}/films/${page}` : format(tmdbUrls.genre_movies, genreId, 1)
      return axios.get(`${protocol}://${host}/api/v0/genres/${genreId}/films/${page}`)
          .then(res => {
            dispatch({
              type: LOAD_FILMS_SUCCESS,
              payload: res.data,
              meta: {
                lastFetched: Date.now()
              }
            })
          })
          .catch(error => {
            console.error(`Error in reducer that handles ${LOAD_FILMS_SUCCESS}: `, error)
            dispatch({
              type: LOAD_FILMS_FAILURE,
              payload: error,
              error: true
            })
          })
    }
    
    return new Promise(() => {
          dispatch({
            type: LOAD_FILMS_SUCCESS,
            payload: [],
            meta: {
              lastFetched: Date.now()
            }
          })
        })
  }
}