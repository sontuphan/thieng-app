import { getRandomProjects } from 'data/projects';

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
 * Get projects
 */
export const GET_PROJECTS = 'GET_PROJECTS';
export const GET_PROJECTS_OK = 'GET_PROJECTS_OK';
export const GET_PROJECTS_FAIL = 'GET_PROJECTS_FAIL';

const _getProjects = (userId, page, limit) => {
  return {
    status: 'OK',
    data: getRandomProjects(userId),
    pagination: { page, limit }
  };
}

export const getProjects = (userId, page, limit) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: GET_PROJECTS });

      let data = _getProjects(userId, page, limit);
      if (!data) {
        dispatch({
          type: GET_PROJECTS_FAIL,
          reason: 'Input is null.',
        });
        return reject('Input is null.');
      }

      dispatch({
        type: GET_PROJECTS_OK,
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
    case GET_PROJECTS_OK:
      return { ...state, ...action.data };
    case GET_PROJECTS_FAIL:
      return { ...state, ...action.data };
    default:
      return state;
  }
}