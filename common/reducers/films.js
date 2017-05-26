import * as types from '../constants'
import config from '../config'
import _ from 'lodash'

const initialState = {
  data: [],
  lastFetched: null,
  isLoading: false,
  error: null,
  config: config
}

export default function films (state = initialState, action) {
  switch (action.type) {
    case types.LOAD_FILMS_REQUEST:
      return { ...state,
        isLoading: true,
        error: null}
    case types.LOAD_FILMS_SUCCESS:
      return { ...state,
        data: _.unionWith(state.data, action.payload, (existing, incoming) => existing.id == incoming.id),
        lastFetched: action.meta.lastFetched,
        isLoading: false}
    case types.LOAD_FILMS_FAILURE:
      return { ...state,
        error: action.payload}
    default:
      return state
  }
}

