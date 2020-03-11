import UserSchema from 'data/users';

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
 * Get user by id
 */
export const GET_USER = 'GET_USER';
export const GET_USER_OK = 'GET_USER_OK';
export const GET_USER_FAIL = 'GET_USER_FAIL';

const _getUser = (userId) => {
  for (let i = 0; i < UserSchema.length; i++) {
    if (userId === UserSchema[i].userId) {
      return {
        status: 'OK',
        data: [UserSchema[i]],
        pagination: { page: 0, limit: 1 }
      };
    }
  }
}

export const getUser = (userId) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: GET_USER });

      let data = _getUser(userId);
      if (!data) {
        dispatch({
          type: GET_USER_FAIL,
          reason: 'Input is null.',
        });
        return reject('Input is null.');
      }

      dispatch({
        type: GET_USER_OK,
        reason: null,
        data: {
          data: data.data,
          pagination: data.pagination
        }
      });
      return resolve(data);
    });
  };
};

/**
 * Get user by code
 */
export const GET_USER_BY_CODE = 'GET_USER_BY_CODE';
export const GET_USER_BY_CODE_OK = 'GET_USER_BY_CODE_OK';
export const GET_USER_BY_CODE_FAIL = 'GET_USER_BY_CODE_FAIL';

const _getUserByCode = (code) => {
  for (let i = 0; i < UserSchema.length; i++) {
    if (code === UserSchema[i].code) {
      return {
        status: 'OK',
        data: [UserSchema[i]],
        pagination: { page: 0, limit: 1 }
      };
    }
  }
}

export const getUserByCode = (code) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: GET_USER_BY_CODE });

      let data = _getUserByCode(code);
      if (!data) {
        dispatch({
          type: GET_USER_BY_CODE_FAIL,
          reason: 'Input is null.',
        });
        return reject('Input is null.');
      }

      dispatch({
        type: GET_USER_BY_CODE_OK,
        reason: null,
        data: {
          data: data.data,
          pagination: data.pagination
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
    case GET_USER_OK:
      return { ...state, ...action.data };
    case GET_USER_FAIL:
      return { ...state, ...action.data };
    case GET_USER_BY_CODE_OK:
      return { ...state, ...action.data };
    case GET_USER_BY_CODE_FAIL:
      return { ...state, ...action.data };
    default:
      return state;
  }
}