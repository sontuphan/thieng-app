import api from '../helpers/api';

/**
 * Documents
 * @default defaultData
 */

const defaultState = {
  value: null,
  repeat: 0,
  visible: false
}


/**
 * Toogle on/off search app
 */
export const TOOGLE_SEARCH = 'TOOGLE_SEARCH';
export const TOOGLE_SEARCH_OK = 'TOOGLE_SEARCH_OK';
export const TOOGLE_SEARCH_FAIL = 'TOOGLE_SEARCH_FAIL';

export const toogleSearch = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: TOOGLE_SEARCH });

      let prevState = getState();
      let prevVisible = prevState.search.visible;

      if (typeof prevVisible !== 'boolean') {
        dispatch({
          type: TOOGLE_SEARCH_FAIL,
          reason: 'Undifined search state.',
        });
        return reject('Undifined search state.');
      }

      dispatch({
        type: TOOGLE_SEARCH_OK,
        reason: null,
        data: {
          visible: !prevVisible,
        }
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

export const searchText = (value) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: SEARCH_TEXT });

      if (!value) {
        dispatch({
          type: SEARCH_TEXT_FAIL,
          reason: 'Input is null.',
          data: { ...defaultState }
        });
        return reject('Input is null.');
      }

      api.get('http://localhost:3001/user', {}, true).then(re => {
        console.log(re);
      }).catch(er => {
        console.log(er);
      });

      let prevState = getState();
      let data = null;
      if (prevState.search.value !== value) data = { value: value, repeat: 0 }
      else data = { value: value, repeat: prevState.search.repeat + 1 }

      dispatch({
        type: SEARCH_TEXT_OK,
        reason: null,
        data: data
      });
      return resolve(value);
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
    case TOOGLE_SEARCH_OK:
      return { ...state, ...action.data };
    case TOOGLE_SEARCH_FAIL:
      return { ...state, ...action.data };
    default:
      return state;
  }
}