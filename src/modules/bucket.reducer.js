import configs from 'configs';
import api from 'helpers/api';

/**
 * Documents
 * @default defaultData
 */

const defaultState = {}

/**
 * Get an item info
 */
export const GET_ITEM = 'GET_ITEM';
export const GET_ITEM_OK = 'GET_ITEM_OK';
export const GET_ITEM_FAIL = 'GET_ITEM_FAIL';

export const getItem = (_id) => {
  return (dispatch, prevState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: GET_ITEM });
      // Check id
      if (!_id) {
        let er = 'Invalid ID'
        dispatch({ type: GET_ITEM_FAIL, reason: er });
        return reject(er);
      }
      // Get offline
      const { bucket } = prevState();
      if (bucket[_id]) {
        dispatch({ type: GET_ITEM_OK });
        return resolve(bucket[_id]);
      }
      // Get online
      const { api: { base } } = configs;
      api.get(`${base}/item`, { _id }, true).then(re => {
        const item = re.data;
        const data = item ? { [item._id]: item } : {};
        dispatch({ type: GET_ITEM_OK, data });
        return resolve(re.data);
      }).catch(er => {
        dispatch({ type: GET_ITEM_FAIL, reason: er });
        return reject(er);
      });
    });
  }
}

/**
 * Get an user info
 */
export const GET_USER = 'GET_USER';
export const GET_USER_OK = 'GET_USER_OK';
export const GET_USER_FAIL = 'GET_USER_FAIL';

export const getUser = (_id) => {
  return (dispatch, prevState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: GET_USER });
      // Check id
      if (!_id) {
        let er = 'Invalid ID'
        dispatch({ type: GET_USER_FAIL, reason: er });
        return reject(er);
      }
      // Get offline
      const { bucket } = prevState();
      if (bucket[_id]) {
        dispatch({ type: GET_USER_OK });
        return resolve(bucket[_id]);
      }
      // Get online
      const { api: { base } } = configs;
      api.get(`${base}/user`, { _id }, true).then(re => {
        const user = re.data;
        const data = user ? { [user._id]: user } : {};
        dispatch({ type: GET_USER_OK, data });
        return resolve(re.data);
      }).catch(er => {
        dispatch({ type: GET_USER_FAIL, reason: er });
        return reject(er);
      });
    });
  }
}


/**
 * Reducder
 */
export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_ITEM_OK:
      return { ...state, ...action.data };
    case GET_ITEM_FAIL:
      return { ...state, ...action.data };
    case GET_USER_OK:
      return { ...state, ...action.data };
    case GET_USER_FAIL:
      return { ...state, ...action.data };
    default:
      return state;
  }
}