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
    limit: 5,
  }
}

/**
 * Get projects
 */
export const GET_PROJECTS = 'GET_PROJECTS';
export const GET_PROJECTS_OK = 'GET_PROJECTS_OK';
export const GET_PROJECTS_FAIL = 'GET_PROJECTS_FAIL';

export const getProjects = (limit, page) => {
  return (dispatch, prevState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: GET_PROJECTS });

      const { projects: { data } } = prevState();
      const { api: { base } } = configs;
      api.get(`${base}/public/projects`, { limit, page, condition: { mode: 'public' } }).then(re => {
        dispatch({
          type: GET_PROJECTS_OK,
          data: {
            data: data.concat(re.data),
            pagination: re.pagination
          }
        });
        return resolve(re.data);
      }).catch(er => {
        dispatch({
          type: GET_PROJECTS_FAIL,
          reason: er
        });
        return reject(er);
      });
    });
  }
}


/**
 * Add a project
 */
export const ADD_PROJECT = 'ADD_PROJECT';
export const ADD_PROJECT_OK = 'ADD_PROJECT_OK';
export const ADD_PROJECT_FAIL = 'ADD_PROJECT_FAIL';

export const addProject = (data) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: ADD_PROJECT });

      const { api: { base } } = configs;
      api.post(`${base}/project`, { project: data }).then(re => {
        dispatch({
          type: ADD_PROJECT_OK,
          reason: null,
        });
        return resolve(re.data);
      }).catch(er => {
        dispatch({
          type: ADD_PROJECT_FAIL,
          reason: er
        });
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
    case GET_PROJECTS_OK:
      return { ...state, ...action.data };
    case GET_PROJECTS_FAIL:
      return { ...state, ...action.data };
    case ADD_PROJECT_OK:
      return { ...state, ...action.data };
    case ADD_PROJECT_FAIL:
      return { ...state, ...action.data };
    default:
      return state;
  }
}