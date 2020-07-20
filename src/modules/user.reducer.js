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
 * Get users
 */
export const GET_USERS = 'GET_USERS';
export const GET_USERS_OK = 'GET_USERS_OK';
export const GET_USERS_FAIL = 'GET_USERS_FAIL';

export const getUsers = (condition, limit, page) => {
  return (dispatch, prevState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: GET_USERS });

      const { users: { data, pagination } } = prevState();
      const accumulative = page === pagination.page + 1;
      const { api: { base } } = configs;
      return api.get(`${base}/public/users`, { condition, limit, page }).then(re => {
        dispatch({
          type: GET_USERS_OK,
          data: {
            data: accumulative ? data.concat(re.data) : re.data,
            pagination: re.pagination
          }
        });
        return resolve(re.data);
      }).catch(er => {
        dispatch({ type: GET_USERS_FAIL, reason: er });
        return reject(er);
      });
    });
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
    case GET_USERS_OK:
      return { ...state, ...action.data };
    case GET_USERS_FAIL:
      return { ...state, ...action.data };
    case UPDATE_USER_OK:
      return { ...state, ...action.data };
    case UPDATE_USER_FAIL:
      return { ...state, ...action.data };
    default:
      return state;
  }
}