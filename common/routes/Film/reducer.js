import * as types from '../../constants'
import config from '../../config'

const initialState = {
  data: [],
  credits: [],
  cast: [],
  lastFetched: null,
  isLoading: false,
  error: null,
  config: config
}

export default function film (state = initialState, action) {
  switch (action.type) {
    case types.LOAD_FILM_REQUEST:
      return { ...state,
        isLoading: true,
        error: null}
    case types.LOAD_FILM_SUCCESS:
      return { ...state,
        data: action.payload,
        lastFetched: action.meta.lastFetched,
        isLoading: false}
    case types.LOAD_FILM_FAILURE:
      return { ...state,
        error: action.payload}
    case types.LOAD_FILM_CREDITS_REQUEST:
      return { ...state,
        creditsLoading: true,
        error: null}
    case types.LOAD_FILM_CREDITS_SUCCESS:
      return { ...state,
        credits: action.payload,
        lastFetched: action.meta.lastFetched,
        isLoading: false}
    case types.LOAD_FILM_CREDITS_FAILURE:
      return { ...state,
        error: action.payload}
    default:
      return state
  }
}

// Example of a co-located selector
export const selectFilm = state => state.film
