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
export const GET_USER_BY_ID = 'GET_USER_BY_ID';
export const GET_USER_BY_ID_OK = 'GET_USER_BY_ID_OK';
export const GET_USER_BY_ID_FAIL = 'GET_USER_BY_ID_FAIL';

const _getUserById = (id) => {
  for (let i = 0; i < UserSchema.length; i++) {
    if (id === UserSchema[i].id) {
      return {
        status: 'OK',
        data: [UserSchema[i]],
        pagination: { page: 0, limit: 1 }
      };
    }
  }

}

export const getUserById = (id) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: GET_USER_BY_ID });

      let data = _getUserById(id);
      if (!data) {
        dispatch({
          type: GET_USER_BY_ID_FAIL,
          reason: 'Input is null.',
        });
        return reject('Input is null.');
      }

      dispatch({
        type: GET_USER_BY_ID_OK,
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
    case GET_USER_BY_ID_OK:
      return { ...state, ...action.data };
    case GET_USER_BY_ID_FAIL:
      return { ...state, ...action.data };
    default:
      return state;
  }
}