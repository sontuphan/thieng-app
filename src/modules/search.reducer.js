/**
 * Documents
 * @default defaultData
 */

const defaultState = {
  value: null,
  repeat: 0
}


/**
 * Search bar
 */
export const SEARCH = 'SEARCH';
export const SEARCH_OK = 'SEARCH_OK';
export const SEARCH_FAIL = 'SEARCH_FAIL';

export const search = (value) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: SEARCH });

      if (!value) {
        dispatch({
          type: SEARCH_FAIL,
          reason: 'Input is null.',
          data: { ...defaultState }
        });
        return reject('Input is null.');
      }

      let prevState = getState();
      let data = null;
      if (prevState.search.value !== value) data = { value: value, repeat: 0 }
      else data = { value: value, repeat: prevState.search.repeat + 1 }

      dispatch({
        type: SEARCH_OK,
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
    case SEARCH_OK:
      return { ...state, ...action.data };
    case SEARCH_FAIL:
      return { ...state, ...action.data };
    default:
      return state;
  }
}