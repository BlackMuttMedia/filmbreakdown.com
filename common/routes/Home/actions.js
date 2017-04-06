import { * } from '../../constants'
import common_config from '../../common-config'
var tmdbUrls = require('../../tmdb-urls').init(common_config.tmdb_key).api_urls

export function loadNowPlaying () {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest
    dispatch({ type: LOAD_GENRES_REQUEST })
    return axios.get(`${protocol}://${host}/api/v0/genres`)
      .then(res => {
        dispatch({
          type: LOAD_GENRES_SUCCESS,
          payload: res.data,
          meta: {
            lastFetched: Date.now()
          }
        })
      })
      .catch(error => {
        console.error(`Error in reducer that handles ${LOAD_GENRES_SUCCESS}: `, error)
        dispatch({
          type: LOAD_GENRES_FAILURE,
          payload: error,
          error: true
        })
      })
  }
}

/*
export function fetchPopular(page) {
  return function(dispatch, getState) {
    fetch(tmdbUrls.misc_popular.format(page || 1))
      .then(function(response) {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.json();
      })
      .then(function(results){
        dispatch(fetchPopularSuccess(results));
      });
  };

  return {
    meta: {remote: true },
    type: 'FETCH_POPULAR',
    filmId
  };
}

export function fetchPopularFailure(error) {
  return {
    meta: {remote: true },
    type: 'FETCH_POPULAR_SEARCH',
    error
  };
}

export function fetchPopularSuccess(results) {
  return {
    meta: {remote: true },
    type: 'FETCH_POPULAR_SUCCESS',
    results
  };


export function logIn(user, password, cb) {
  alert('hi!')
  return
}
*/
/*
  return function(dispatch, getState) {
    var postUrl = '/login';
    var jsonData = { 'username': user, 'password': password };
    var stringified = JSON.stringify(jsonData);

    fetch(postUrl, {
        method: 'POST', 
        headers: {
          'Content-Type' : 'application/json'
        },
        body: stringified
      })
      .then(function(response) {
        if (response.status >= 400) {
          dispatch(setInvalidAuthResponse(
            response.status, 
            "Server/Communication Error", 
            response.statusText));
          return undefined;
        }
        else {
          return response.json();
        }
      })
      .then(function(userData) {
        dispatch(setValidAuthResponse(userData));
        if(cb)
        {
          cb(userData);
        }
      });
  }
}

export function setInvalidAuthResponse(status, message, responseMessage) {
  var auth = {
    isValid: false,
    message: message,
    responseMessage: responseMessage,
    user: undefined
  };

  return {
    meta: {remote: true},
    type: 'SET_CURRENT_AUTHORIZATION',
    auth: auth
  };
}

export function setValidAuthResponse(userData, successMessage) {
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
  
  return {
    meta: {remote: true},
    type: 'SET_CURRENT_AUTHORIZATION',
    auth: auth, 
  };
}

export function saveUser(user, cb) {
  return function(dispatch, getState) {
    var result = true;
    var postUrl = '/signup';
    var stringified = JSON.stringify(user);

    fetch(postUrl, {
        method: user._id ? 'PUT' : 'POST', 
        headers: {
          'Content-Type' : 'application/json'
        },
        body: stringified
      })
      .then(function(response) {
        if (response.status >= 400) {
          dispatch(setInvalidAuthResponse(
            response.status, 
            "Server/Communication Error", 
            response.statusText));
          return undefined;
        }
        else {
          return response.json();
        }
      })
      .then(function(userData) {
        dispatch(setValidAuthResponse(userData, "User Created Successfully"));
        if(cb)
        {
          cb(userData);
        }
      });
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
    type: 'DELETE_AUTHORIZATION'
  }
}

export function clearAuthMessage() {
  return {
    meta: {remote: true},
    type: 'CLEAR_AUTH_MESSAGE'
  }
*/