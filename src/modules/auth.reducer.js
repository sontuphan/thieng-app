
import designerImg1 from 'static/images/designer-1.jpg';

/**
 * Documents
 * @default defaultData
 */

const defaultState = {
  displayname: null,
  email: null,
  service: null,
  avatar: null,
  isLoggedIn: null
}

const TEST_DATA = {
  google: {
    displayname: 'Sơn Tự',
    email: 'sontu@gmail.com',
    service: 'google',
    avatar: designerImg1,
    isLoggedIn: true
  },
  facebook: {
    displayname: 'Tự Phan',
    email: 'tuphan@facebook.com',
    service: 'facebook',
    avatar: designerImg1,
    isLoggedIn: true
  }
}

/**
 * Log in
 */
export const LOG_IN = 'LOG_IN';
export const LOG_IN_OK = 'LOG_IN_OK';
export const LOG_IN_FAIL = 'LOG_IN_FAIL';

export const logIn = (service) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: LOG_IN });

      if (service === 'apple') {
        dispatch({
          type: LOG_IN_FAIL,
          reason: 'Failed connection.',
          data: { ...defaultState }
        });
        return reject('Failed connection.');
      }

      dispatch({
        type: LOG_IN_OK,
        reason: null,
        data: TEST_DATA[service]
      });
      return resolve(TEST_DATA[service]);
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
      return resolve(TEST_DATA[service]);
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