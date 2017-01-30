/* eslint-disable */
import {
	LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
	SAVE_USER_REQUEST, SAVE_USER_SUCCESS, SAVE_USER_FAILURE,
	CLEAR_AUTH_MESSAGE, DELETE_AUTHORIZATION
} from '../../constants'
var jwtDecode = require('jwt-decode')

export function logIn (username, password, cb) {
  return (dispatch, getState, { axios }) => {
    var jsonData = { 'username': username, 'password': password }

    dispatch({ type: LOGIN_REQUEST })
    return axios.post('/api/v0/auth/login', jsonData)
      .then(res => {
        dispatch(setValidAuthResponse(res.data, undefined, LOGIN_SUCCESS))
        if(cb)
        {
          cb(res.data);
        }
      })
      .catch(error => {
        console.error(`Error in reducer that handles ${LOGIN_SUCCESS}: `, error)
        dispatch(setInvalidAuthResponse(
            error, 
            "Server/Communication Error", 
            undefined,
            LOGIN_FAILURE))
      })
  }
}

export function saveUser(user, cb) {
  return (dispatch, getState, { axios }) => {

    dispatch({ type: SAVE_USER_REQUEST })
    return axios.post('/api/v0/auth/signup', user)
      .then(res => {
        dispatch(setValidAuthResponse(res.data, undefined, SAVE_USER_SUCCESS))
        if(cb)
        {
          cb(res.data);
        }
      })
      .catch(error => {
        console.error(`Error in reducer that handles ${SAVE_USER_REQUEST}: `, error)
        dispatch(setInvalidAuthResponse(
            error, 
            "Server/Communication Error", 
            undefined,
            SAVE_USER_FAILURE))
      })
  }
}

export function setValidAuthResponse(userData, successMessage, postType) {
  return (dispatch, getState, { axios }) => {
	  var auth = {
	    isValid: false,
	    user: undefined,
	    responseMessage: undefined,
	  };

	  var self = this;
	  if(!userData.success){
	    auth.isValid = false;
	    auth.message = userData.error;
	  }
	  else
	  {
	    auth.jwt = userData.token;
	    auth.isValid = true;
	    auth.message = successMessage || "Login Successful";
	    auth.user = jwtDecode(userData.token);
	  }
	  
	  dispatch({
	    type: postType,
	    payload: auth,
	    error: false,
      meta: {
        lastFetched: Date.now()
      }
	  })
	}
}

export function setInvalidAuthResponse(status, message, responseMessage, postType) {
  return (dispatch, getState, { axios }) => {
	  var auth = {
	    isValid: false,
	    message: message,
	    responseMessage: responseMessage,
	    user: undefined
	  };

	  dispatch({
	    type: postType,
	    payload: auth,
	    error: true
	  })
	}
}

export function populateAuthorization() {
  return {
    meta: {remote: true},
    type: 'POPULATE_AUTHORIZATION'
  }
}

export function deleteAuthorization() {
  return {
    meta: {remote: true},
    type: DELETE_AUTHORIZATION
  }
}

export function clearAuthMessage() {
  return (dispatch, getState, { axios }) => {
	  return {
	    meta: {remote: true},
	    type: CLEAR_AUTH_MESSAGE
	  }
	}
}
