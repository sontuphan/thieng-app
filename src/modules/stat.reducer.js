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
 * Get the number of items
 */
export const GET_NUMBER_ITEMS = 'GET_NUMBER_ITEMS';
export const GET_NUMBER_ITEMS_OK = 'GET_NUMBER_ITEMS_OK';
export const GET_NUMBER_ITEMS_FAIL = 'GET_NUMBER_ITEMS_FAIL';

export const getNumberItems = (condition) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: GET_NUMBER_ITEMS });

      const { api: { base } } = configs;
      return api.get(`${base}/stat/seller/number-items`, { condition }).then(re => {
        dispatch({
          type: GET_NUMBER_ITEMS_OK,
          data: { data: re.data }
        });
        return resolve(re.data);
      }).catch(er => {
        dispatch({ type: GET_NUMBER_ITEMS_FAIL, reason: er });
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
    case GET_NUMBER_ITEMS_OK:
      return { ...state, ...action.data };
    case GET_NUMBER_ITEMS_FAIL:
      return { ...state, ...action.data };
    default:
      return state;
  }
}