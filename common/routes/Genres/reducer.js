import * as types from '../../constants'
import config from '../../config'

const initialState = {
  data: [],
  lastFetched: null,
  isLoading: false,
  error: null,
  config: config
}

export default function genres (state = initialState, action) {
  switch (action.type) {
    case types.LOAD_GENRES_REQUEST:
      return { ...state,
        isLoading: true,
        error: null}
    case types.LOAD_GENRES_SUCCESS:
      return { ...state,
        data: action.payload,
        lastFetched: action.meta.lastFetched,
        isLoading: false}
    case types.LOAD_GENRES_FAILURE:
      return { ...state,
        error: action.payload}
    default:
      return state
  }
}

// Example of a co-located selector
export const selectGenres = state => state.genres
