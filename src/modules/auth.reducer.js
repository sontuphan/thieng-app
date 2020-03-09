import jwt from 'jsonwebtoken';
import storage from 'helpers/storage';

/**
 * Documents
 * @default defaultData
 */

const defaultState = {
  isValid: null,
  service: null,
  accessToken: null,
  email: null,
  displayname: null,
  avatar: null,
}

/**
 * Init
 */
let data = storage.get('auth');
console.log(data.accessToken)
console.log(jwt.decode(data.accessToken))

/**
 * Log in
 */
export const LOG_IN = 'LOG_IN';
export const LOG_IN_OK = 'LOG_IN_OK';
export const LOG_IN_FAIL = 'LOG_IN_FAIL';

export const logIn = (data) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: LOG_IN });

      if (false) {
        dispatch({
          type: LOG_IN_FAIL,
          reason: 'Failed connection.',
          data: { ...defaultState }
        });
        return reject('Failed connection.');
      }

      storage.set('auth', data);
      dispatch({
        type: LOG_IN_OK,
        reason: null,
        data: { isValid: true, ...data }
      });
      return resolve(data);
    });
  }
}


/**
 * Log out
 */
export const LOG_OUT = 'LOG_OUT';
export const LOG_OUT_OK = 'LOG_OUT_OK';
export const LOG_OUT_FAIL = 'LOG_OUT_FAIL';

export const logOut = (service) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: LOG_OUT });

      if (!service) {
        dispatch({
          type: LOG_OUT_FAIL,
          reason: 'Failed connection.',
          data: null
        });
        return reject('Failed connection.');
      }

      dispatch({
        type: LOG_OUT_OK,
        reason: null,
        data: { ...defaultState }
      });
      return resolve();
    });
  }
}

/**
 * Reducder
 */
export default (state = defaultState, action) => {
  switch (action.type) {
    case LOG_IN_OK:
      return { ...state, ...action.data };
    case LOG_IN_FAIL:
      return { ...state, ...action.data };
    case LOG_OUT_OK:
      return { ...state, ...action.data };
    case LOG_OUT_FAIL:
      return { ...state, ...action.data };
    default:
      return state;
  }
}