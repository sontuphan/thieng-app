import configs from 'configs';
import api from 'helpers/api';
import ObjectID from 'bson-objectid';

/**
 * Documents
 * @default defaultState
 */
const defaultState = {
  _id: null, // Dummy ID
  name: null,
  type: null,
  source: null,
  userId: null,
  metadata: {
    color: null
  },
  nativeFile: null, // Raw file object
}

/**
 * Set an in-storage file
 */
export const SET_INSTORAGE_FILE = 'SET_INSTORAGE_FILE';
export const SET_INSTORAGE_FILE_OK = 'SET_INSTORAGE_FILE_OK';
export const SET_INSTORAGE_FILE_FAIL = 'SET_INSTORAGE_FILE_FAIL';

export const setInstorageFile = (nativeFile) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: SET_INSTORAGE_FILE });

      let er = null;
      const source = URL.createObjectURL(nativeFile);
      if (!source) er = 'No file';
      const { auth: { _id } } = getState();
      if (!_id) er = 'No authentication';
      if (er) {
        dispatch({ type: SET_INSTORAGE_FILE_FAIL, reason: er });
        return reject(er);
      }

      const data = {
        _id: ObjectID.generate(),
        name: nativeFile.name,
        type: nativeFile.type,
        source,
        userId: _id,
        nativeFile,
      }
      dispatch({ type: SET_INSTORAGE_FILE_OK, data });
      return resolve(data);
    });
  }
}

/**
 * Unset an in-storage file
 */
export const UNSET_INSTORAGE_FILE = 'UNSET_INSTORAGE_FILE';
export const UNSET_INSTORAGE_FILE_OK = 'UNSET_INSTORAGE_FILE_OK';
export const UNSET_INSTORAGE_FILE_FAIL = 'UNSET_INSTORAGE_FILE_FAIL';

export const unsetInstorageFile = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: UNSET_INSTORAGE_FILE });

      const { file: { source } } = getState();
      if (!source) {
        const er = 'Empty storage';
        dispatch({ type: UNSET_INSTORAGE_FILE_FAIL, reason: er });
        return reject(er);
      }

      URL.revokeObjectURL(source);
      const data = { ...defaultState }
      dispatch({ type: UNSET_INSTORAGE_FILE_OK, data });
      return resolve(data);
    });
  }
}


/**
 * Update an in-storage file
 */
export const UPDATE_INSTORAGE_FILE = 'UPDATE_INSTORAGE_FILE';
export const UPDATE_INSTORAGE_FILE_OK = 'UPDATE_INSTORAGE_FILE_OK';
export const UPDATE_INSTORAGE_FILE_FAIL = 'UPDATE_INSTORAGE_FILE_FAIL';

export const updateInstorageFile = (data) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: UPDATE_INSTORAGE_FILE });

      const { file: { source } } = getState();
      let er = null;
      if (!source) er = 'Cannot update empty file';
      if (!data) er = 'Empty data';
      if (er) {
        dispatch({ type: UPDATE_INSTORAGE_FILE_FAIL, reason: er });
        return reject(er);
      }

      dispatch({ type: UPDATE_INSTORAGE_FILE_OK, data });
      return resolve(data);
    });
  }
}

/**
 * Upload the in-storage file to servers
 */
export const PUSH_INSTORAGE_FILE = 'PUSH_INSTORAGE_FILE';
export const PUSH_INSTORAGE_FILE_OK = 'PUSH_INSTORAGE_FILE_OK';
export const PUSH_INSTORAGE_FILE_FAIL = 'PUSH_INSTORAGE_FILE_FAIL';

export const pushInstorageFile = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: PUSH_INSTORAGE_FILE });

      const { file: { source, nativeFile, metadata } } = getState();
      if (!nativeFile) {
        let er = 'Invalid inputs';
        dispatch({ type: PUSH_INSTORAGE_FILE_FAIL, reason: er });
        return reject(er);
      }

      let data = new FormData();
      const type = nativeFile.type.split('/')[0];
      data.append(type, nativeFile);
      data.append('metadata', JSON.stringify(metadata));
      const { api: { base } } = configs;
      return api.post(`${base}/file/${type}`, data).then(re => {
        URL.revokeObjectURL(source);
        dispatch({ type: PUSH_INSTORAGE_FILE_OK, data: { ...defaultState } });
        return resolve(re.data);
      }).catch(er => {
        dispatch({ type: PUSH_INSTORAGE_FILE_FAIL, reason: er });
        return reject(er);
      });
    });
  }
}

/**
 * Update file
 */
export const UPDATE_FILE = 'UPDATE_FILE';
export const UPDATE_FILE_OK = 'UPDATE_FILE_OK';
export const UPDATE_FILE_FAIL = 'UPDATE_FILE_FAIL';

export const updateFile = (file) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: UPDATE_FILE });

      if (!file) {
        let er = 'Invalid inputs';
        dispatch({ type: UPDATE_FILE_FAIL, reason: er });
        return reject(er);
      }

      const { api: { base } } = configs;
      return api.put(`${base}/file`, { file }).then(re => {
        dispatch({ type: UPDATE_FILE_OK });
        return resolve(re.data);
      }).catch(er => {
        dispatch({ type: UPDATE_FILE_FAIL, reason: er });
        return reject(er);
      });
    });
  }
}

/**
 * Delete a file
 */
export const DELETE_FILE = 'DELETE_FILE';
export const DELETE_FILE_OK = 'DELETE_FILE_OK';
export const DELETE_FILE_FAIL = 'DELETE_FILE_FAIL';

export const deleteFile = (file) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: DELETE_FILE });

      if (!file) {
        let er = 'Invalid inputs';
        dispatch({ type: DELETE_FILE_FAIL, reason: er });
        return reject(er);
      }

      const { api: { base } } = configs;
      return api.delete(`${base}/file`, { file }).then(re => {
        dispatch({ type: DELETE_FILE_OK });
        return resolve(re.data);
      }).catch(er => {
        dispatch({ type: DELETE_FILE_FAIL, reason: er });
        return reject(er);
      });
    });
  }
}

/**
 * Reducder
 */
export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_INSTORAGE_FILE_OK:
      return { ...state, ...action.data };
    case SET_INSTORAGE_FILE_FAIL:
      return { ...state, ...action.data };
    case UNSET_INSTORAGE_FILE_OK:
      return { ...state, ...action.data };
    case UNSET_INSTORAGE_FILE_FAIL:
      return { ...state, ...action.data };
    case UPDATE_INSTORAGE_FILE_OK:
      return { ...state, ...action.data };
    case UPDATE_INSTORAGE_FILE_FAIL:
      return { ...state, ...action.data };
    case PUSH_INSTORAGE_FILE_OK:
      return { ...state, ...action.data };
    case PUSH_INSTORAGE_FILE_FAIL:
      return { ...state, ...action.data };
    case UPDATE_FILE_OK:
      return { ...state, ...action.data };
    case UPDATE_FILE_FAIL:
      return { ...state, ...action.data };
    case DELETE_FILE_OK:
      return { ...state, ...action.data };
    case DELETE_FILE_FAIL:
      return { ...state, ...action.data };
    default:
      return state;
  }
}