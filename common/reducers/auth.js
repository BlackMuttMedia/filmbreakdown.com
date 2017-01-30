/* eslint-disable */
import * as types from '../constants'
import config from '../config'
import jwtDecode from 'jwt-decode'

const initialState = {
  lastFetched: null,
  isLoading: false,
  error: null,
  currentAuthorization: {}
}

export default function auth (state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
    case types.SAVE_USER_REQUEST:
      return { ...state,
        isLoading: true,
        error: null,
        currentAuthorization: {}}
    case types.LOGIN_SUCCESS: 
    case types.SAVE_USER_SUCCESS:
      return { ...state,
        error: null,
        currentAuthorization: action.payload,
        lastFetched: action.meta.lastFetched,
        isLoading: false}
    case types.LOGIN_FAILURE: 
    case types.SAVE_USER_FAILURE: 
      return { ...state,
        isLoading: false,
        error: data.payload,
        currentAuthorization: {}, 
        lastFetched: null}
    case types.CLEAR_AUTH_MESSAGE:
      return { ...state,
        currentAuthorization: {
          ...currentAuthorization,
          message: null
        }}
    case types.DELETE_AUTHORIZATION:
      return { ...state,
        currentAuthorization: {}}
    default:
      return state
  }
}
  
// Example of a co-located selector
export const selectAuth = state => state.auth.currentAuthorization
// export const config = state => state.config
export const selectIsLoggedIn = state => state.auth.currentAuthorization && state.auth.currentAuthorization.isValid 
export const selectCurrentUser = state => state.auth.currentAuthorization && state.auth.currentAuthorization.token && jwtDecode(state.auth.currentAuthorization.token)
