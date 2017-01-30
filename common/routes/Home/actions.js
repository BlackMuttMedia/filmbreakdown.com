import { LOAD_GENRES_REQUEST, LOAD_GENRES_SUCCESS, LOAD_GENRES_FAILURE } from '../../constants'


export function logIn(user, password, cb) {
  alert('hi!')
  return
}
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