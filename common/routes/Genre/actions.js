import { LOAD_GENRE_REQUEST, LOAD_GENRE_SUCCESS, LOAD_GENRE_FAILURE } from '../../constants'

export function loadGenre (slug) {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest
    dispatch({ type: LOAD_GENRE_REQUEST })
    return axios.get(`${protocol}://${host}/api/v0/genres/${slug}`)
      .then(res => {
        dispatch({
          type: LOAD_GENRE_SUCCESS,
          payload: res.data,
          meta: {
            lastFetched: Date.now()
          }
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
