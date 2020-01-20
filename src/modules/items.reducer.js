import { getRandomItems } from 'data/items';

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
 * Get items
 */
export const GET_ITEMS = 'GET_ITEMS';
export const GET_ITEMS_OK = 'GET_ITEMS_OK';
export const GET_ITEMS_FAIL = 'GET_ITEMS_FAIL';

const _getItems = (page, limit) => {
  let data = [];
  for (let i = 0; i < limit; i++) {
    data.push(getRandomItems()[i % 2]);
  }
  return { status: 'OK', data, pagination: { page, limit } };
}

export const getItems = (page, limit) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: GET_ITEMS });

      let data = _getItems(page, limit);
      if (!data) {
        dispatch({
          type: GET_ITEMS_FAIL,
          reason: 'Input is null.',
        });
        return reject('Input is null.');
      }

      dispatch({
        type: GET_ITEMS_OK,
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
 * Get item by id
 */
export const GET_ITEM_BY_ID = 'GET_ITEM_BY_ID';
export const GET_ITEM_BY_ID_OK = 'GET_ITEM_BY_ID_OK';
export const GET_ITEM_BY_ID_FAIL = 'GET_ITEM_BY_ID_FAIL';

const _getItemById = (id) => {
  return {
    status: 'OK',
    data: [getRandomItems()[id]],
    pagination: { page: 0, limit: 1 }
  };
}

export const getItemById = (id) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: GET_ITEM_BY_ID });

      let data = _getItemById(id);
      if (!data) {
        dispatch({
          type: GET_ITEM_BY_ID_FAIL,
          reason: 'Input is null.',
        });
        return reject('Input is null.');
      }

      dispatch({
        type: GET_ITEM_BY_ID_OK,
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
    case GET_ITEMS_OK:
      return { ...state, ...action.data };
    case GET_ITEMS_FAIL:
      return { ...state, ...action.data };
    case GET_ITEM_BY_ID_OK:
      return { ...state, ...action.data };
    case GET_ITEM_BY_ID_FAIL:
      return { ...state, ...action.data };
    default:
      return state;
  }
}