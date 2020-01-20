import { getRandomItems } from 'data/items';

/**
 * Documents
 * @default defaultData
 */

const defaultState = {
  data: [],
  limit: 0,
}


/**
 * Recommend items
 */
export const RECOMMEND_ITEMS = 'RECOMMEND_ITEMS';
export const RECOMMEND_ITEMS_OK = 'RECOMMEND_ITEMS_OK';
export const RECOMMEND_ITEMS_FAIL = 'RECOMMEND_ITEMS_FAIL';

const _recommendItems = (limit) => {
  let data = [];
  for (let i = 0; i < limit; i++) {
    data.push(getRandomItems()[i % 2]);
  }
  return { status: 'OK', data };
}

export const recommendItems = (limit) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: RECOMMEND_ITEMS });

      let data = _recommendItems(limit);
      if (!data) {
        dispatch({
          type: RECOMMEND_ITEMS_FAIL,
          reason: 'Input is null.',
        });
        return reject('Input is null.');
      }

      dispatch({
        type: RECOMMEND_ITEMS_OK,
        reason: null,
        data: {
          data: data.data,
          limit: limit
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
    case RECOMMEND_ITEMS_OK:
      return { ...state, ...action.data };
    case RECOMMEND_ITEMS_FAIL:
      return { ...state, ...action.data };
    default:
      return state;
  }
}