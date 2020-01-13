
import designerImg1 from 'static/images/designer-1.jpg';

/**
 * Documents
 * @default defaultData
 */

const defaultState = {
  displayname: null,
  email: null,
  link: null,
  avatar: null,
  isLoggedIn: null
}

const TEST_DATA = {
  displayname: 'Thiêng Việt',
  email: 'thiengviet@gmail.com',
  link: '/user/thieng-viet',
  avatar: designerImg1,
  isLoggedIn: true
}

/**
 * Log in
 */
export const LOG_IN = 'LOG_IN';
export const LOG_IN_OK = 'LOG_IN_OK';
export const LOG_IN_FAIL = 'LOG_IN_FAIL';

export const logIn = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: LOG_IN });

      let random = Math.floor(Math.random() * 10);
      if (random % 2) {
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
        data: TEST_DATA
      });
      return resolve(TEST_DATA);
    });
  }
}

/**
 * Log out
 */
export const LOG_OUT = 'LOG_OUT';
export const LOG_OUT_OK = 'LOG_OUT_OK';
export const LOG_OUT_FAIL = 'LOG_OUT_FAIL';

export const logOut = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: LOG_OUT });

      let random = Math.floor(Math.random() * 10);
      if (random % 2) {
        dispatch({
          type: LOG_OUT_FAIL,
          reason: 'Failed connection.',
          data: TEST_DATA
        });
        return reject('Failed connection.');
      }

      dispatch({
        type: LOG_OUT_OK,
        reason: null,
        data: { ...defaultState }
      });
      return resolve(TEST_DATA);
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