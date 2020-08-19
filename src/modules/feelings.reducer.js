import configs from 'configs';
import api from 'helpers/api';

/**
 * Documents
 * @default defaultData
 */

const defaultState = {
  data: {}, // key: targetId, value: {like: 0, dislike: 0}
  you: {},
}

/**
 * Get a feeling
 */
export const GET_FEELING = 'GET_FEELING';
export const GET_FEELING_OK = 'GET_FEELING_OK';
export const GET_FEELING_FAIL = 'GET_FEELING_FAIL';

export const getFeeling = (condition) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: GET_FEELING });

      const { api: { base } } = configs;
      return api.get(`${base}/feeling`, { condition }).then(re => {
        dispatch({ type: GET_FEELING_OK, data: { you: re.data } });
        return resolve(re.data);
      }).catch(er => {
        dispatch({ type: GET_FEELING_FAIL, reason: er });
        return reject(er);
      });
    });
  }
}

/**
 * Get feelings
 */
export const GET_FEELINGS = 'GET_FEELINGS';
export const GET_FEELINGS_OK = 'GET_FEELINGS_OK';
export const GET_FEELINGS_FAIL = 'GET_FEELINGS_FAIL';

export const getFeelings = (targetId, subcondition = {}) => {
  return (dispatch, prevState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: GET_FEELINGS });

      const { api: { base } } = configs;
      return api.get(`${base}/public/feelings`, { condition: { ...subcondition, targetId } }).then(re => {
        let { feelings: { data } } = prevState();
        data[targetId] = re.data;
        dispatch({ type: GET_FEELINGS_OK, data: { data } });
        return resolve(re.data);
      }).catch(er => {
        dispatch({ type: GET_FEELINGS_FAIL, reason: er });
        return reject(er);
      });
    });
  };
}

/**
 * Add a feeling
 */
export const ADD_FEELING = 'ADD_FEELING';
export const ADD_FEELING_OK = 'ADD_FEELING_OK';
export const ADD_FEELING_FAIL = 'ADD_FEELING_FAIL';

export const addFeeling = (feeling) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: ADD_FEELING });

      const { api: { base } } = configs;
      return api.post(`${base}/feeling`, { feeling }).then(re => {
        dispatch({ type: ADD_FEELING_OK, reason: null });
        return resolve(re.data);
      }).catch(er => {
        dispatch({ type: ADD_FEELING_FAIL, reason: er });
        return reject(er);
      });
    });
  };
}

/**
 * Update a feeling
 */
export const UPDATE_FEELING = 'UPDATE_FEELING';
export const UPDATE_FEELING_OK = 'UPDATE_FEELING_OK';
export const UPDATE_FEELING_FAIL = 'UPDATE_FEELING_FAIL';

export const updateFeeling = (feeling) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: UPDATE_FEELING });

      const { api: { base } } = configs;
      return api.put(`${base}/feeling`, { feeling }).then(re => {
        dispatch({ type: UPDATE_FEELING_OK, reason: null });
        return resolve(re.data);
      }).catch(er => {
        dispatch({ type: UPDATE_FEELING_FAIL, reason: er });
        return reject(er);
      });
    });
  };
}

/**
 * Delete a feeling
 */
export const DELETE_FEELING = 'DELETE_FEELING';
export const DELETE_FEELING_OK = 'DELETE_FEELING_OK';
export const DELETE_FEELING_FAIL = 'DELETE_FEELING_FAIL';

export const deleteFeeling = (feeling) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: DELETE_FEELING });

      const { api: { base } } = configs;
      return api.delete(`${base}/feeling`, { feeling }).then(re => {
        dispatch({ type: DELETE_FEELING_OK, reason: null });
        return resolve(re.data);
      }).catch(er => {
        dispatch({ type: DELETE_FEELING_FAIL, reason: er });
        return reject(er);
      });
    });
  };
}

/**
 * Reducder
 */
export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_FEELING_OK:
      return { ...state, ...action.data };
    case GET_FEELING_FAIL:
      return { ...state, ...action.data };
    case GET_FEELINGS_OK:
      return { ...state, ...action.data };
    case GET_FEELINGS_FAIL:
      return { ...state, ...action.data };
    case ADD_FEELING_OK:
      return { ...state, ...action.data };
    case ADD_FEELING_FAIL:
      return { ...state, ...action.data };
    case UPDATE_FEELING_OK:
      return { ...state, ...action.data };
    case UPDATE_FEELING_FAIL:
      return { ...state, ...action.data };
    case DELETE_FEELING_OK:
      return { ...state, ...action.data };
    case DELETE_FEELING_FAIL:
      return { ...state, ...action.data };
    default:
      return state;
  }
}