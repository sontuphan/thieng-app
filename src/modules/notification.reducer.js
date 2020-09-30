/**
 * Documents
 * @default defaultData
 */

const defaultState = {
  notification: [],
  events: [],
  confirmation: {
    message: '',
    type: 'info',
    visible: false
  },
  visible: false
}

/**
 * Toggle on/off notification app
 */
export const TOGGLE_NOTIFICATION = 'TOGGLE_NOTIFICATION';
export const TOGGLE_NOTIFICATION_OK = 'TOGGLE_NOTIFICATION_OK';
export const TOGGLE_NOTIFICATION_FAIL = 'TOGGLE_NOTIFICATION_FAIL';

export const toggleNotification = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: TOGGLE_NOTIFICATION });

      let prevState = getState();
      let prevVisible = prevState.notification.visible;

      if (typeof prevVisible !== 'boolean') {
        dispatch({
          type: TOGGLE_NOTIFICATION_FAIL,
          reason: 'Undifined cart state.',
        });
        return reject('Undifined cart state.');
      }

      dispatch({
        type: TOGGLE_NOTIFICATION_OK,
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
 * Get notification
 */
export const GET_NOTIFICATION = 'GET_NOTIFICATION';
export const GET_NOTIFICATION_OK = 'GET_NOTIFICATION_OK';
export const GET_NOTIFICATION_FAIL = 'GET_NOTIFICATION_FAIL';


const _getNotification = () => {
  return {
    status: 'OK',
    data: []
  };
}

export const getNotification = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: GET_NOTIFICATION });

      let data = _getNotification();

      if (!data) {
        dispatch({
          type: GET_NOTIFICATION_FAIL,
          reason: 'Undifined cart state.',
        });
        return reject('Undifined cart state.');
      }

      dispatch({
        type: GET_NOTIFICATION_OK,
        reason: null,
        data: {
          notification: data.data,
        }
      });
      return resolve(data.data);
    });
  }
}


/**
 * Get events
 */
export const GET_EVENTS = 'GET_EVENTS';
export const GET_EVENTS_OK = 'GET_EVENTS_OK';
export const GET_EVENTS_FAIL = 'GET_EVENTS_FAIL';


const _getEvents = () => {
  return {
    status: 'OK',
    data: []
  };
}

export const getEvents = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: GET_EVENTS });

      let data = _getEvents();

      if (!data) {
        dispatch({
          type: GET_EVENTS_FAIL,
          reason: 'Failed connection.',
        });
        return reject('Failed connection.');
      }

      dispatch({
        type: GET_EVENTS_OK,
        reason: null,
        data: {
          events: data.data,
        }
      });
      return resolve(data.data);
    });
  }
}

/**
 * SET CONFIRMATION
 */
export const SET_CONFIRMATION = 'SET_CONFIRMATION';
export const SET_CONFIRMATION_OK = 'SET_CONFIRMATION_OK';
export const SET_CONFIRMATION_FAIL = 'SET_CONFIRMATION_FAIL';

export const setConfirmation = (visible, message, type) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: SET_CONFIRMATION });

      if (typeof visible !== 'boolean') {
        const er = 'Invalid inputs'
        dispatch({ type: SET_CONFIRMATION_FAIL, reason: er });
        return reject(er);
      }

      const { notification: { confirmation: { message: prevMessage, type: prevType } } } = getState();
      dispatch({
        type: SET_CONFIRMATION_OK,
        reason: null,
        data: {
          confirmation: {
            visible,
            message: message || prevMessage,
            type: type || prevType
          },
        }
      });
      return resolve(null);
    });
  }
}



/**
 * Reducder
 */
export default (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_NOTIFICATION_OK:
      return { ...state, ...action.data };
    case TOGGLE_NOTIFICATION_FAIL:
      return { ...state, ...action.data };
    case GET_NOTIFICATION_OK:
      return { ...state, ...action.data };
    case GET_NOTIFICATION_FAIL:
      return { ...state, ...action.data };
    case GET_EVENTS_OK:
      return { ...state, ...action.data };
    case GET_EVENTS_FAIL:
      return { ...state, ...action.data };
    case SET_CONFIRMATION_OK:
      return { ...state, ...action.data };
    case SET_CONFIRMATION_FAIL:
      return { ...state, ...action.data };
    default:
      return state;
  }
}