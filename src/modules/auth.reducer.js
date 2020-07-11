import configs from 'configs';
import api from 'helpers/api';
import authentication from 'helpers/authentication';

/**
 * Documents
 * @default defaultData
 */

const defaultState = {
  visible: false,
  isValid: null,
  service: null,
  origin: null,
  accessToken: null,
  email: null,
  displayname: null,
  avatar: null,
}

/**
 * Toogle on/off authentication app
 */
export const TOOGLE_AUTH = 'TOOGLE_AUTH';
export const TOOGLE_AUTH_OK = 'TOOGLE_AUTH_OK';
export const TOOGLE_AUTH_FAIL = 'TOOGLE_AUTH_FAIL';

export const toogleAuth = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: TOOGLE_AUTH });

      let prevState = getState();
      let prevVisible = prevState.auth.visible;

      if (typeof prevVisible !== 'boolean') {
        const er = 'Undifined cart state';
        dispatch({ type: TOOGLE_AUTH_FAIL, reason: er });
        return reject(er);
      }

      dispatch({ type: TOOGLE_AUTH_OK, data: { visible: !prevVisible } });
      return resolve(!prevVisible);
    });
  }
}

/**
 * Refesh session
 */
export const REFRESH_SESSION = 'REFRESH_SESSION';
export const REFRESH_SESSION_OK = 'REFRESH_SESSION_OK';
export const REFRESH_SESSION_FAIL = 'REFRESH_SESSION_FAIL';

export const refreshSession = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: REFRESH_SESSION });

      const data = authentication.get();
      if (!data || typeof data !== 'object') {
        dispatch({
          type: REFRESH_SESSION_FAIL,
          reason: 'Storage is empty',
          data: { ...defaultState }
        });
        return reject('Storage is empty');
      }

      if (data.service !== 'thieng') {
        const { api: { base, auth } } = configs;
        api.get(base + auth, {}).then(re => {
          authentication.set(re.data); // Set new thieng's token
          dispatch({
            type: REFRESH_SESSION_OK,
            reason: null,
            data: { isValid: true, ...re.data }
          });
          return resolve(re);
        }).catch(er => {
          dispatch({
            type: REFRESH_SESSION_FAIL,
            reason: 'Failed connection',
            data: { ...defaultState }
          });
          return reject(er);
        });
      }
      else if (!authentication.verify(data.accessToken)) {
        authentication.clear(); // Clear outdated token
        dispatch({
          type: REFRESH_SESSION_FAIL,
          reason: 'Outdated access token',
          data: { ...defaultState }
        });
        return reject('Outdated access token');
      }
      else {
        dispatch({
          type: REFRESH_SESSION_OK,
          reason: null,
          data: { isValid: true, ...data }
        });
        return resolve(data);
      }
    });
  }
}

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

      authentication.set(data);
      const { api: { base, auth } } = configs;
      api.get(base + auth, {}).then(re => {
        authentication.set(re.data); // Set new thieng's token
        dispatch({
          type: LOG_IN_OK,
          reason: null,
          data: { isValid: true, ...re.data }
        });
        return resolve(re);
      }).catch(er => {
        dispatch({
          type: LOG_IN_FAIL,
          reason: 'Failed connection',
          data: { ...defaultState }
        });
        return reject(er);
      });
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

      let data = authentication.get();
      if (!data) {
        dispatch({
          type: LOG_OUT_FAIL,
          reason: 'Empty storage',
          data: null
        });
        return reject('Empty storage');
      }

      authentication.clear();
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
    case TOOGLE_AUTH_OK:
      return { ...state, ...action.data };
    case TOOGLE_AUTH_FAIL:
      return { ...state, ...action.data };
    case REFRESH_SESSION_OK:
      return { ...state, ...action.data };
    case REFRESH_SESSION_FAIL:
      return { ...state, ...action.data };
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