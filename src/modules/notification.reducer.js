import NotificationSchema from 'data/notification';
import EventSchema from 'data/events';

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
 * Toogle on/off notification app
 */
export const TOOGLE_NOTIFICATION = 'TOOGLE_NOTIFICATION';
export const TOOGLE_NOTIFICATION_OK = 'TOOGLE_NOTIFICATION_OK';
export const TOOGLE_NOTIFICATION_FAIL = 'TOOGLE_NOTIFICATION_FAIL';

export const toogleNotification = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: TOOGLE_NOTIFICATION });

      let prevState = getState();
      let prevVisible = prevState.notification.visible;

      if (typeof prevVisible !== 'boolean') {
        dispatch({
          type: TOOGLE_NOTIFICATION_FAIL,
          reason: 'Undifined cart state.',
        });
        return reject('Undifined cart state.');
      }

      dispatch({
        type: TOOGLE_NOTIFICATION_OK,
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
    data: NotificationSchema
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
    data: EventSchema
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

export const setConfirmation = (visible, message = '', type = 'info') => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: SET_CONFIRMATION });

      if (typeof visible !== 'boolean') {
        const er = 'Invalid input'
        dispatch({ type: SET_CONFIRMATION_FAIL, reason: er });
        return reject(er);
      }

      dispatch({
        type: SET_CONFIRMATION_OK,
        reason: null,
        data: {
          confirmation: { visible, message, type },
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
    case TOOGLE_NOTIFICATION_OK:
      return { ...state, ...action.data };
    case TOOGLE_NOTIFICATION_FAIL:
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