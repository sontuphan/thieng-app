import configs from 'configs';
import api from 'helpers/api';

/**
 * Documents
 * @default defaultData
 */

const defaultState = {
  url: null,
  color: null,
  visible: false,
  promise: {
    resolve: () => { },
    reject: () => { },
  }
}

/**
 * Toogle on/off image editor app
 */
export const RUN_IMAGE_EDITOR = 'RUN_IMAGE_EDITOR';
export const RUN_IMAGE_EDITOR_OK = 'RUN_IMAGE_EDITOR_OK';
export const RUN_IMAGE_EDITOR_FAIL = 'RUN_IMAGE_EDITOR_FAIL';

export const runImageEditor = (url, color) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: RUN_IMAGE_EDITOR });

      dispatch({
        type: RUN_IMAGE_EDITOR_OK,
        reason: null,
        data: { visible: true, url, color, promise: { resolve, reject } }
      });
    });
  }
}


/**
 * Update data in flows
 */
export const SET_IMAGE_DATA = 'SET_IMAGE_DATA';
export const SET_IMAGE_DATA_OK = 'SET_IMAGE_DATA_OK';
export const SET_IMAGE_DATA_FAIL = 'SET_IMAGE_DATA_FAIL';

export const setImageData = (data) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: SET_IMAGE_DATA });

      if (!data) {
        dispatch({
          type: SET_IMAGE_DATA_FAIL,
          reason: 'Invalid inputs'
        });
        return reject('Invalid inputs');
      }

      dispatch({
        type: SET_IMAGE_DATA_OK,
        reason: null,
        data
      });
      return resolve();
    });
  }
}


/**
 * Upload files
 */
export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
export const UPLOAD_IMAGE_OK = 'UPLOAD_IMAGE_OK';
export const UPLOAD_IMAGE_FAIL = 'UPLOAD_IMAGE_FAIL';

export const uploadFile = (file) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: UPLOAD_IMAGE });

      if (!file || !file.type) {
        dispatch({
          type: UPLOAD_IMAGE_FAIL,
          reason: 'Invalid inputs'
        });
        return reject('Invalid inputs');
      }

      let data = new FormData();
      const type = file.type.split('/')[0];
      data.append(type, file);
      const { api: { base, upload } } = configs;
      api.post(`${base}${upload}/${type}`, data, true).then(re => {
        dispatch({
          type: UPLOAD_IMAGE_OK,
          reason: null,
        });
        return resolve(re.data);
      }).catch(er => {
        dispatch({
          type: UPLOAD_IMAGE_FAIL,
          reason: er
        });
        return reject(er);
      });
    });
  }
}


/**
 * Return data
 */
export const RETURN_IMAGE_DATA = 'RETURN_IMAGE_DATA';
export const RETURN_IMAGE_DATA_OK = 'RETURN_IMAGE_DATA_OK';
export const RETURN_IMAGE_DATA_FAIL = 'RETURN_IMAGE_DATA_FAIL';

export const returnImageData = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: RETURN_IMAGE_DATA });

      let { imageEditor: { url, color, promise } } = getState();

      promise.resolve({ url, color });

      dispatch({
        type: RETURN_IMAGE_DATA_OK,
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
    case RUN_IMAGE_EDITOR_OK:
      return { ...state, ...action.data };
    case RUN_IMAGE_EDITOR_FAIL:
      return { ...state, ...action.data };
    case SET_IMAGE_DATA_OK:
      return { ...state, ...action.data };
    case SET_IMAGE_DATA_FAIL:
      return { ...state, ...action.data };
    case RETURN_IMAGE_DATA_OK:
      return { ...state, ...action.data };
    case RETURN_IMAGE_DATA_FAIL:
      return { ...state, ...action.data };
    case UPLOAD_IMAGE_OK:
      return { ...state, ...action.data };
    case UPLOAD_IMAGE_FAIL:
      return { ...state, ...action.data };
    default:
      return state;
  }
}