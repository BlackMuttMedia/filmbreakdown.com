import * as types from '../../constants'
import config from '../../config'

const initialState = {
  data: [],
  lastFetched: null,
  isLoading: false,
  error: null,
  config: config
}

export default function genre (state = initialState, action) {
  switch (action.type) {
    case types.LOAD_GENRE_REQUEST:
      return { ...state,
        isLoading: true,
        error: null}
    case types.LOAD_GENRE_SUCCESS:
      return { ...state,
        data: action.payload,
        lastFetched: action.meta.lastFetched,
        isLoading: false}
    case types.LOAD_GENRE_FAILURE:
      return { ...state,
        error: action.payload}
    default:
      return state
  }
}

// Example of a co-located selector
export const selectGenre = state => state.genre
