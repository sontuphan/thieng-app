import UserSchema from 'data/users';
import CommentSchema from 'data/comments';

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
 * Get item's comments
 */
export const GET_COMMENTS = 'GET_COMMENTS';
export const GET_COMMENTS_OK = 'GET_COMMENTS_OK';
export const GET_COMMENTS_FAIL = 'GET_COMMENTS_FAIL';

const _getUserById = (id) => {
  for (let i = 0; i < UserSchema.length; i++) {
    if (id === UserSchema[i].id) {
      return UserSchema[i];
    }
  }
}

const _getComments = (itemId) => {
  let comments = [];
  for (let i = 0; i < CommentSchema.length; i++) {
    if (itemId === CommentSchema[i].item)
      comments.push(CommentSchema[i]);
  }
  for (let i = 0; i < comments.length; i++) {
    let user = _getUserById(comments[i].user);
    comments[i].user = user
  }
  return {
    status: 'OK',
    data: comments
  };
}

export const getComments = (itemId) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: GET_COMMENTS });

      let data = _getComments(itemId);
      if (!data) {
        dispatch({
          type: GET_COMMENTS_FAIL,
          reason: 'Input is null.',
        });
        return reject('Input is null.');
      }

      dispatch({
        type: GET_COMMENTS_OK,
        reason: null,
        data: {
          data: data.data,
        }
      });
      return resolve(data);
    });
  };
};



/**
 * Reducder
 */
export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_COMMENTS_OK:
      return { ...state, ...action.data };
    case GET_COMMENTS_FAIL:
      return { ...state, ...action.data };
    default:
      return state;
  }
}