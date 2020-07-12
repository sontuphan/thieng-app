import isEqual from 'react-fast-compare';
import configs from 'configs';
import api from 'helpers/api';

/**
 * Documents
 * @default defaultData
 */

const defaultState = {
  value: null,
  repeat: 0,
  visible: false,
  data: [],
  pagination: {
    page: -1,
    limit: 5,
  }
}


/**
 * Toggle on/off search app
 */
export const TOGGLE_SEARCH = 'TOGGLE_SEARCH';
export const TOGGLE_SEARCH_OK = 'TOGGLE_SEARCH_OK';
export const TOGGLE_SEARCH_FAIL = 'TOGGLE_SEARCH_FAIL';

export const toggleSearch = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: TOGGLE_SEARCH });

      let prevState = getState();
      let prevVisible = prevState.search.visible;

      if (typeof prevVisible !== 'boolean') {
        let er = 'Undifined search state';
        dispatch({ type: TOGGLE_SEARCH_FAIL, reason: er });
        return reject(er);
      }

      dispatch({
        type: TOGGLE_SEARCH_OK,
        reason: null,
        data: { visible: !prevVisible }
      });
      return resolve(!prevVisible);
    });
  }
}


/**
 * Search bar
 */
export const SEARCH_TEXT = 'SEARCH_TEXT';
export const SEARCH_TEXT_OK = 'SEARCH_TEXT_OK';
export const SEARCH_TEXT_FAIL = 'SEARCH_TEXT_FAIL';

export const searchText = (condition, limit, page) => {
  return (dispatch, prevState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: SEARCH_TEXT });

      if (!condition) {
        const er = 'Invalid inputs';
        dispatch({ type: SEARCH_TEXT_FAIL, reason: er });
        return reject(er);
      }

      const { search: { value, repeat, data, pagination } } = prevState();
      let update = null;
      if (!isEqual(value, condition)) update = { value: condition, repeat: 0 }
      else update = { value: condition, repeat: repeat + 1 }

      const accumulative = page === pagination.page + 1;
      const { api: { base } } = configs;
      return api.get(`${base}/public/items`, { condition, limit, page }).then(re => {
        dispatch({
          type: SEARCH_TEXT_OK,
          data: {
            ...update,
            data: accumulative ? data.concat(re.data) : re.data,
            pagination: re.pagination
          }
        });
        return resolve(re.data);
      }).catch(er => {
        dispatch({ type: SEARCH_TEXT_FAIL, reason: er });
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
    case SEARCH_TEXT_OK:
      return { ...state, ...action.data };
    case SEARCH_TEXT_FAIL:
      return { ...state, ...action.data };
    case TOGGLE_SEARCH_OK:
      return { ...state, ...action.data };
    case TOGGLE_SEARCH_FAIL:
      return { ...state, ...action.data };
    default:
      return state;
  }
}