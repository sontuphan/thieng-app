/**
 * Documents
 * @default defaultState
 */
const defaultState = {
  file: null,
  visible: false,
  promise: {
    resolve: () => { },
    reject: () => { },
  }
}

/**
 * Toggle on/off image editor app
 */
export const RUN_EDITOR = 'RUN_EDITOR';
export const RUN_EDITOR_OK = 'RUN_EDITOR_OK';
export const RUN_EDITOR_FAIL = 'RUN_EDITOR_FAIL';

export const runEditor = (file) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: RUN_EDITOR });

      if (!file) {
        const er = 'No file provided';
        dispatch({
          type: RUN_EDITOR_FAIL,
          reason: er,
          data: { ...defaultState }
        });
        return reject(er);
      }

      return dispatch({
        type: RUN_EDITOR_OK,
        reason: null,
        data: { visible: true, file, promise: { resolve, reject } }
      });
    });
  }
}

/**
 * Return data
 */
export const RETURN_DATA = 'RETURN_DATA';
export const RETURN_DATA_OK = 'RETURN_DATA_OK';
export const RETURN_DATA_FAIL = 'RETURN_DATA_FAIL';

export const returnData = (value) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: RETURN_DATA });

      const { editor: { promise } } = getState();

      promise.resolve(value);

      dispatch({
        type: RETURN_DATA_OK,
        reason: null,
        data: { ...defaultState }
      });
      return resolve();
    });
  }
}

/**
 * Reducder
 */
export default (state = defaultState, action) => {
  switch (action.type) {
    case RUN_EDITOR_OK:
      return { ...state, ...action.data };
    case RUN_EDITOR_FAIL:
      return { ...state, ...action.data };
    case RETURN_DATA_OK:
      return { ...state, ...action.data };
    case RETURN_DATA_FAIL:
      return { ...state, ...action.data };
    default:
      return state;
  }
}