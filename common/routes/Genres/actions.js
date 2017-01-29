import { LOAD_GENRES_REQUEST, LOAD_GENRES_SUCCESS, LOAD_GENRES_FAILURE } from '../../constants'

export function loadGenres () {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest
    dispatch({ type: LOAD_GENRES_REQUEST })
    return axios.get(`${protocol}://${host}/api/v0/genres`)
      .then(res => {
        dispatch({
          type: LOAD_GENRES_SUCCESS,
          payload: res.data,
          meta: {
            lastFetched: Date.now()
          }
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
