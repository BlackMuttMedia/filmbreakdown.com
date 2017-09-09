/* eslint-disable */
import { 
  LOAD_GENRE_REQUEST, LOAD_GENRE_SUCCESS, LOAD_GENRE_FAILURE,
  LOAD_GENRE_DESCRIPTIONS_REQUEST, LOAD_GENRE_DESCRIPTIONS_SUCCESS, LOAD_GENRE_DESCRIPTIONS_FAILURE,
  SAVE_GENRE_DESCRIPTION_REQUEST, SAVE_GENRE_DESCRIPTION_SUCCESS, SAVE_GENRE_DESCRIPTION_FAILURE
} from '../../constants'
import { loadGenreFilms } from '../Genres/actions'

export function loadGenre (slug) {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest
    dispatch({ type: LOAD_GENRE_REQUEST })
    dispatch(loadGenreDescriptions(slug, 0, 10))
    return axios.get(`${protocol}://${host}/api/v0/genres/${slug}`)
      .then(res => {
        console.log(res)
        console.log(res.data)
        const genre = res.data
        const genreId = genre.id
        console.log(genreId)
        axios.get(`${protocol}://${host}/api/v0/genres/${genreId}/films`)
          .then((res) => {
            genre.films = { results: res.data }
        dispatch({
          type: LOAD_GENRE_SUCCESS,
          payload: genre,
          meta: {
            lastFetched: Date.now()
          }
        })

          })
      })
      .catch(error => {
        console.error(`Error in reducer that handles ${LOAD_GENRE_SUCCESS}: `, error)
        dispatch({
          type: LOAD_GENRE_FAILURE,
          payload: error,
          error: true
        })
      })
  }
}
export function loadGenreDescriptions (slug, start, count) {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest
    dispatch({ type: LOAD_GENRE_DESCRIPTIONS_REQUEST })

    return axios.get(`${protocol}://${host}/api/v0/genres/${slug}/descriptions/${start}/${count}`)
      .then(res => {
        dispatch({
          type: LOAD_GENRE_DESCRIPTIONS_SUCCESS,
          payload: res.data.descriptions,
          meta: {
            lastFetched: Date.now()
          }
        })
      })
      .catch(error => {
        console.error(`Error in reducer that handles ${LOAD_GENRE_DESCRIPTIONS_SUCCESS}: `, error)
        dispatch({
          type: LOAD_GENRE_DESCRIPTIONS_FAILURE,
          payload: error,
          error: true
        })
      })
  }
}

export function saveGenreDescription(slug, genreDescription, cb) {
  return (dispatch, getState, { axios }) => {
    return axios.post('/api/v0/genres/descriptions/save', genreDescription)
      .then(res => {
        dispatch({
          type: SAVE_GENRE_DESCRIPTION_SUCCESS,
          payload: res.data,
          meta: {
            lastFetched: Date.now()
          }
        })

        console.log('callback', cb)
        if(cb)
        {
          cb(res.data);
        }

        dispatch(loadGenreDescriptions(slug, 0, 10))
      })
      .catch(error => {
        console.error(`Error in reducer that handles ${SAVE_GENRE_DESCRIPTION_REQUEST}: `, error)
        dispatch({
          type: SAVE_GENRE_DESCRIPTION_FAILURE,
          payload: error
        })
      })
  }
}
