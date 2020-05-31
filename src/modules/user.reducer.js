import configs from 'configs';
import api from 'helpers/api';

/**
 * Documents
 * @default defaultData
 */

const defaultState = {
  data: [],
  pagination: {
    page: 0,
    limit: 0
  }
}

/**
 * Get user by code
 */
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_OK = 'UPDATE_USER_OK';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';

export const updateUser = (user) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: UPDATE_USER });

      if (!user) {
        let er = 'Input is null';
        dispatch({ type: UPDATE_USER_FAIL, reason: er });
        return reject(er);
      }

      const { api: { base } } = configs;
      return api.put(`${base}/user`, { user }).then(re => {
        dispatch({ type: UPDATE_USER_OK });
        return resolve(re.data);
      }).catch(er => {
        dispatch({ type: UPDATE_USER_FAIL, reason: er });
        return reject(er);
      });
    });
  };
};


/**
 * Reducder
 */
export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_USER_OK:
      return { ...state, ...action.data };
    case UPDATE_USER_FAIL:
      return { ...state, ...action.data };
    default:
      return state;
  }
}