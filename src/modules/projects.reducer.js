import { getRandomProjects } from 'data/projects';
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
 * Get projects
 */
export const GET_PROJECTS = 'GET_PROJECTS';
export const GET_PROJECTS_OK = 'GET_PROJECTS_OK';
export const GET_PROJECTS_FAIL = 'GET_PROJECTS_FAIL';

const _getUser = (userId) => {
  for (let i = 0; i < UserSchema.length; i++) {
    if (userId === UserSchema[i].userId) {
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
    if (typeof comments[i].user === 'object') break;
    let user = _getUser(comments[i].user);
    comments[i].user = user
  }
  return comments;
}

const _getProjects = (userId, page, limit) => {
  let projects = getRandomProjects(userId);
  projects = projects.map(project => {
    let comments = _getComments(project.id)
    project.comments = comments;
    return project;
  });
  return {
    status: 'OK',
    data: projects,
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
          reason: 'Input is null',
        });
        return reject('Input is null');
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