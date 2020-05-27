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
    case GET_USER_BY_CODE_OK:
      return { ...state, ...action.data };
    case GET_USER_BY_CODE_FAIL:
      return { ...state, ...action.data };
    default:
      return state;
  }
}