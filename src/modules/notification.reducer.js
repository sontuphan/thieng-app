/**
 * Documents
 * @default defaultData
 */

const defaultState = {
  data: [],
  visible: false
}

/**
 * Get toogle on/off notification app
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
 * Reducder
 */
export default (state = defaultState, action) => {
  switch (action.type) {
    case TOOGLE_NOTIFICATION_OK:
      return { ...state, ...action.data };
    case TOOGLE_NOTIFICATION_FAIL:
      return { ...state, ...action.data };
    default:
      return state;
  }
}