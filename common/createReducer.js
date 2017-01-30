import { combineReducers } from 'redux'

let auth = require('./reducers/auth').default

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
    auth,
    ...asyncReducers
  })
}
