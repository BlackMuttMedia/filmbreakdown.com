/* eslint-disable */
import { 
  LOAD_GENRES_REQUEST, LOAD_GENRES_SUCCESS, LOAD_GENRES_FAILURE,
  LOAD_FILMS_REQUEST, LOAD_FILMS_SUCCESS, LOAD_FILMS_FAILURE 
} from '../../constants'
import common_config from '../../common-config'
import { loadFilms } from '../Films/actions'
import { format } from '../../helpers/TextHelper'
import { init } from '../../helpers/tmdb-urls'

let tmdbUrls = init(common_config.tmdb_key).api_urls
let genres = []

export function loadGenres () {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest
    const genresCount = ((getState().genres || {}).data || []).length
    dispatch({ type: LOAD_GENRES_REQUEST })
    dispatch(loadFilms())
    return axios.get(`${protocol}://${host}/api/v0/genres`)
      .then(res => {
        dispatch({
          type: LOAD_GENRES_SUCCESS,
          payload: res.data.genres,
          meta: {
            lastFetched: Date.now()
          }
        });

        res.data.genres.forEach((genre) => {
          genres[genre.name.toLowerCase()] = genre.id
          dispatch(loadGenreFilms(genre.id))
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

export function loadGenreFilms(genreId, page = 1) {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest
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
}