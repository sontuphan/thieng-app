import configs from 'configs';
import api from 'helpers/api';

/**
 * Documents
 * @default defaultData
 */

const defaultState = {
  data: [],
  sample: 0,
}


/**
 * Recommend items
 */
export const RECOMMEND_ITEMS = 'RECOMMEND_ITEMS';
export const RECOMMEND_ITEMS_OK = 'RECOMMEND_ITEMS_OK';
export const RECOMMEND_ITEMS_FAIL = 'RECOMMEND_ITEMS_FAIL';

export const recommendItems = (condition, sample) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: RECOMMEND_ITEMS });

      const { api: { base } } = configs;
      return api.get(`${base}/recommendation/items`, { condition, sample }).then(re => {
        dispatch({
          type: RECOMMEND_ITEMS_OK,
          data: { data: re.data, sample }
        });
        return resolve(re.data);
      }).catch(er => {
        dispatch({ type: RECOMMEND_ITEMS_FAIL, reason: er });
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
    case RECOMMEND_ITEMS_OK:
      return { ...state, ...action.data };
    case RECOMMEND_ITEMS_FAIL:
      return { ...state, ...action.data };
    default:
      return state;
  }
}