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

export const getItem = (_id, reset = false) => {
  return (dispatch, prevState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: GET_ITEM });
      // Check id
      if (!_id) {
        const er = 'Invalid ID';
        dispatch({ type: GET_ITEM_FAIL, reason: er });
        return reject(er);
      }
      // Get offline
      const { bucket } = prevState();
      if (bucket[_id] && !reset) {
        dispatch({ type: GET_ITEM_OK });
        return resolve(bucket[_id]);
      }
      // Get online
      const { api: { base } } = configs;
      return api.get(`${base}/item`, { _id }).then(re => {
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

export const getUser = (_id, reset = false) => {
  return (dispatch, prevState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: GET_USER });
      // Check id
      if (!_id) {
        const er = 'Invalid ID';
        dispatch({ type: GET_USER_FAIL, reason: er });
        return reject(er);
      }
      // Get offline
      const { bucket } = prevState();
      if (bucket[_id] && !reset) {
        dispatch({ type: GET_USER_OK });
        return resolve(bucket[_id]);
      }
      // Get online
      const { api: { base } } = configs;
      return api.get(`${base}/user`, { _id }).then(re => {
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
 * Get a file
 */
export const GET_FILE = 'GET_FILE';
export const GET_FILE_OK = 'GET_FILE_OK';
export const GET_FILE_FAIL = 'GET_FILE_FAIL';

export const getFile = (_id, reset = false) => {
  return (dispatch, prevState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: GET_FILE });
      // Check id
      if (!_id) {
        const er = 'Invalid ID';
        dispatch({ type: GET_FILE_FAIL, reason: er });
        return reject(er);
      }
      // Get offline
      const { bucket } = prevState();
      if (bucket[_id] && !reset) {
        dispatch({ type: GET_FILE_OK });
        return resolve(bucket[_id]);
      }
      // Get online
      const { api: { base } } = configs;
      return api.get(`${base}/file`, { _id }).then(re => {
        const file = re.data;
        const data = file ? { [file._id]: file } : {};
        dispatch({ type: GET_FILE_OK, data });
        return resolve(re.data);
      }).catch(er => {
        dispatch({ type: GET_FILE_FAIL, reason: er });
        return reject(er);
      });
    });
  }
}

/**
 * Get an order
 */
export const GET_ORDER = 'GET_ORDER';
export const GET_ORDER_OK = 'GET_ORDER_OK';
export const GET_ORDER_FAIL = 'GET_ORDER_FAIL';

export const getOrder = (_id, reset = false) => {
  return (dispatch, prevState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: GET_ORDER });
      // Check id
      if (!_id) {
        const er = 'Invalid ID';
        dispatch({ type: GET_FILE_FAIL, reason: er });
        return reject(er);
      }
      // Get offline
      const { bucket } = prevState();
      if (bucket[_id] && !reset) {
        dispatch({ type: GET_ORDER_OK });
        return resolve(bucket[_id]);
      }
      // Get online
      const { api: { base } } = configs;
      return api.get(`${base}/order`, { _id }).then(re => {
        const order = re.data;
        const data = order ? { [order._id]: order } : {};
        dispatch({ type: GET_ORDER_OK, data });
        return resolve(re.data);
      }).catch(er => {
        dispatch({ type: GET_ORDER_FAIL, reason: er });
        return reject(er);
      });
    });
  }
}

/**
 * Get a comment
 */
export const GET_COMMENT = 'GET_COMMENT';
export const GET_COMMENT_OK = 'GET_COMMENT_OK';
export const GET_COMMENT_FAIL = 'GET_COMMENT_FAIL';

export const getComment = (_id, reset = false) => {
  return (dispatch, prevState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: GET_COMMENT });
      // Check id
      if (!_id) {
        const er = 'Invalid ID';
        dispatch({ type: GET_COMMENT_FAIL, reason: er });
        return reject(er);
      }
      // Get offline
      const { bucket } = prevState();
      if (bucket[_id] && !reset) {
        dispatch({ type: GET_ORDER_OK });
        return resolve(bucket[_id]);
      }
      // Get online
      const { api: { base } } = configs;
      return api.get(`${base}/comment`, { _id }).then(re => {
        const comment = re.data;
        const data = comment ? { [comment._id]: comment } : {};
        dispatch({ type: GET_COMMENT_OK, data });
        return resolve(re.data);
      }).catch(er => {
        dispatch({ type: GET_COMMENT_FAIL, reason: er });
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
    case GET_FILE_OK:
      return { ...state, ...action.data };
    case GET_FILE_FAIL:
      return { ...state, ...action.data };
    case GET_ORDER_OK:
      return { ...state, ...action.data };
    case GET_ORDER_FAIL:
      return { ...state, ...action.data };
    case GET_COMMENT_OK:
      return { ...state, ...action.data };
    case GET_COMMENT_FAIL:
      return { ...state, ...action.data };
    default:
      return state;
  }
}