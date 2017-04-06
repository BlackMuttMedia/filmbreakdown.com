import { 
  LOAD_GENRES_REQUEST, LOAD_GENRES_SUCCESS, LOAD_GENRES_FAILURE,
  LOAD_GENRE_FILMS_REQUEST, LOAD_GENRE_FILMS_SUCCESS, LOAD_GENRE_FILMS_FAILURE 
} from '../../constants'
import common_config from '../../common-config'
import { loadFilms } from '../Films/actions'
import { format } from '../../helpers/TextHelper'
var tmdbUrls = require('../../tmdb-urls').init(common_config.tmdb_key).api_urls

export function loadGenres () {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest
    dispatch({ type: LOAD_GENRES_REQUEST })
    dispatch(loadFilms())
    const genre_url = common_config.local ? `${protocol}://${host}/api/v0/genres` : tmdbUrls.genre_list
    return axios.get(genre_url)
      .then(res => {
        dispatch({
          type: LOAD_GENRES_SUCCESS,
          payload: res.data.genres,
          meta: {
            lastFetched: Date.now()
          }
        })
        (res.data.genres || []).forEach((genre) => {
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

export function loadGenreFilms(genreId) {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest
    // dispatch({ type: LOAD_GENRE_FILMS_REQUEST })
    const genre_id_url = common_config.local ? `${protocol}://${host}/api/v0/genres` : format(tmdbUrls.genre_movies, genreId, 1)
    console.log(genre_id_url)
    return axios.get(genre_id_url)
      .then(res => {
        console.log(res)
        /*dispatch({
          type: LOAD_GENRE_FILMS_SUCCESS,
          payload: res.data.genres,
          meta: {
            lastFetched: Date.now()
          }
        })*/
      })
      .catch(error => {
        console.error(`Error in reducer that handles ${LOAD_GENRE_FILMS_SUCCESS}: `, error)
        dispatch({
          type: LOAD_GENRE_FILMS_FAILURE,
          payload: error,
          error: true
        })
      })
  }
}