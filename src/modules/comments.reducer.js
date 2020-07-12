import configs from 'configs';
import api from 'helpers/api';

/**
 * Documents
 * @default defaultData
 */

const defaultState = {
  data: [],
  pagination: {
    page: -1,
    limit: 5
  }
}

/**
 * Get comments
 */
export const GET_COMMENTS = 'GET_COMMENTS';
export const GET_COMMENTS_OK = 'GET_COMMENTS_OK';
export const GET_COMMENTS_FAIL = 'GET_COMMENTS_FAIL';

export const getComments = (condition, limit, page) => {
  return (dispatch, prevState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: GET_COMMENTS });

      const { comments: { data, pagination } } = prevState();
      const accumulative = page === pagination.page + 1;
      const { api: { base } } = configs;
      return api.get(`${base}/public/comments`, { condition, limit, page }).then(re => {
        dispatch({
          type: GET_COMMENTS_OK,
          data: {
            data: accumulative ? data.concat(re.data) : re.data,
            pagination: re.pagination
          }
        });
        return resolve(re.data);
      }).catch(er => {
        dispatch({ type: GET_COMMENTS_FAIL, reason: er });
        return reject(er);
      });
    });
  };
}

/**
 * Update comments
 * This function to realize a pseudo realtime system
 * (Please use it for the above target only)
 */
export const UPDATE_COMMENTS = 'UPDATE_COMMENTS';
export const UPDATE_COMMENTS_OK = 'UPDATE_COMMENTS_OK';
export const UPDATE_COMMENTS_FAIL = 'UPDATE_COMMENTS_FAIL';

export const updateComments = (comments) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: UPDATE_COMMENTS });

      if (typeof comments !== 'object') {
        const er = 'Invalid inputs';
        dispatch({ type: UPDATE_COMMENTS_FAIL, reason: er });
        return reject(er);
      }

      dispatch({
        type: UPDATE_COMMENTS_OK,
        data: {
          data: comments
        }
      });
      return resolve(comments);
    });
  };
}

/**
 * Add a comment
 */
export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_COMMENT_OK = 'ADD_COMMENT_OK';
export const ADD_COMMENT_FAIL = 'ADD_COMMENT_FAIL';

export const addComment = (comment) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: ADD_COMMENT });

      const { api: { base } } = configs;
      return api.post(`${base}/comment`, { comment }).then(re => {
        dispatch({ type: ADD_COMMENT_OK, reason: null });
        return resolve(re.data);
      }).catch(er => {
        dispatch({ type: ADD_COMMENT_FAIL, reason: er });
        return reject(er);
      });
    });
  };
}

/**
 * Delete a comment
 */
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const DELETE_COMMENT_OK = 'DELETE_COMMENT_OK';
export const DELETE_COMMENT_FAIL = 'DELETE_COMMENT_FAIL';

export const deleteComment = (comment) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: DELETE_COMMENT });

      const { api: { base } } = configs;
      return api.delete(`${base}/comment`, { comment }).then(re => {
        dispatch({ type: DELETE_COMMENT_OK, reason: null });
        return resolve(re.data);
      }).catch(er => {
        dispatch({ type: DELETE_COMMENT_FAIL, reason: er });
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
    case GET_COMMENTS_OK:
      return { ...state, ...action.data };
    case GET_COMMENTS_FAIL:
      return { ...state, ...action.data };
    case UPDATE_COMMENTS_OK:
      return { ...state, ...action.data };
    case UPDATE_COMMENTS_FAIL:
      return { ...state, ...action.data };
    case ADD_COMMENT_OK:
      return { ...state, ...action.data };
    case ADD_COMMENT_FAIL:
      return { ...state, ...action.data };
    case DELETE_COMMENT_OK:
      return { ...state, ...action.data };
    case DELETE_COMMENT_FAIL:
      return { ...state, ...action.data };
    default:
      return state;
  }
}