import configs from 'configs';
import api from 'helpers/api';

/**
 * Documents
 * @default defaultData
 */
const PAGINATION = {
  page: -1,
  limit: 5,
}
const defaultState = {
  mall: {
    data: [],
    pagination: { ...PAGINATION }
  },
  creation: {
    data: [],
    pagination: { ...PAGINATION }
  },
  selling: {
    data: [],
    pagination: { ...PAGINATION }
  },
  archive: {
    data: [],
    pagination: { ...PAGINATION }
  }
}

/**
 * Get items
 */
export const GET_ITEMS = 'GET_ITEMS';
export const GET_ITEMS_OK = 'GET_ITEMS_OK';
export const GET_ITEMS_FAIL = 'GET_ITEMS_FAIL';

export const getItems = (condition, limit, page, component = 'mall') => {
  return (dispatch, prevState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: GET_ITEMS });

      const { items: { [component]: { data } } } = prevState();
      const { api: { base } } = configs;
      api.get(`${base}/social/items`, { condition, limit, page }).then(re => {
        dispatch({
          type: GET_ITEMS_OK,
          data: {
            [component]: {
              data: data.concat(re.data),
              pagination: re.pagination
            }
          }
        });
        return resolve(re.data);
      }).catch(er => {
        dispatch({ type: GET_ITEMS_FAIL, reason: er });
        return reject(er);
      });
    });
  }
}


/**
 * Add an item
 */
export const ADD_ITEM = 'ADD_ITEM';
export const ADD_ITEM_OK = 'ADD_ITEM_OK';
export const ADD_ITEM_FAIL = 'ADD_ITEM_FAIL';

export const addItem = (data) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: ADD_ITEM });

      const { api: { base } } = configs;
      api.post(`${base}/item`, { item: data }).then(re => {
        dispatch({ type: ADD_ITEM_OK, reason: null });
        return resolve(re.data);
      }).catch(er => {
        dispatch({ type: ADD_ITEM_FAIL, reason: er });
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
    case GET_ITEMS_OK:
      return { ...state, ...action.data };
    case GET_ITEMS_FAIL:
      return { ...state, ...action.data };
    case ADD_ITEM_OK:
      return { ...state, ...action.data };
    case ADD_ITEM_FAIL:
      return { ...state, ...action.data };
    default:
      return state;
  }
}