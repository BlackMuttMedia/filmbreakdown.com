import { LOAD_FILMS_REQUEST, LOAD_FILMS_SUCCESS, LOAD_FILMS_FAILURE } from '../../constants'

export function loadFilms () {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest
    dispatch({ type: LOAD_FILMS_REQUEST })
    return axios.get(`${protocol}://${host}/api/v0/films`)
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
