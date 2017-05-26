import { combineReducers } from 'redux'

let auth = require('./reducers/auth').default
let nowPlaying = require('./reducers/nowPlaying').default
let genres = require('./reducers/genres').default
let films = require('./reducers/films').default

const initialState = {
  host: '',
  protocol: ''
}

const sourceRequest = (state = initialState, action) => state

// Only combine reducers needed for initial render, others will be
// added async
export default function createReducer (asyncReducers) {
  return combineReducers({
    sourceRequest,
    nowPlaying,
    genres,
    films,
    auth,
    ...asyncReducers
  })
}
