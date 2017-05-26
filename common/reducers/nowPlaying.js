/* eslint-disable */
import * as types from '../constants'
import config from '../config'

const initialState = {
  playing: [],
  lastFetched: null,
  isLoading: false,
  error: null,
}

export default function nowPlaying (state = initialState, action) {
  //console.log('NOW PLAYING STATE!')
  //console.log(state)
  switch (action.type) {
    case types.LOAD_POPULAR_REQUEST:
      return { ...state,
        isLoading: true,
        error: null}
    case types.LOAD_POPULAR_SUCCESS:
      return { ...state,
        playing: action.payload,
        lastFetched: action.meta.lastFetched,
        isLoading: false}
    case types.LOAD_POPULAR_FAILURE:
      return { ...state,
        error: action.payload}
    default:
      return state
  }
}

// Example of a co-located selector
export const selectNowPlaying = state => state.nowPlaying
export const selectState = state => state