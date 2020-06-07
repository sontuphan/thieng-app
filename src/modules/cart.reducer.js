import storage from 'helpers/storage';

const KEY = 'cart';


/**
 * Documents
 * @default defaultData
 */

const defaultState = {
  data: storage.get(KEY) || [],
  visible: true
}

/**
 * Toogle on/off cart app
 */
export const TOOGLE_CART = 'TOOGLE_CART';
export const TOOGLE_CART_OK = 'TOOGLE_CART_OK';
export const TOOGLE_CART_FAIL = 'TOOGLE_CART_FAIL';

export const toogleCart = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: TOOGLE_CART });

      let prevState = getState();
      let prevVisible = prevState.cart.visible;

      if (typeof prevVisible !== 'boolean') {
        dispatch({
          type: TOOGLE_CART_FAIL,
          reason: 'Undifined cart state.',
        });
        return reject('Undifined cart state.');
      }

      dispatch({
        type: TOOGLE_CART_OK,
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
 * Add cart
 */
export const SET_CART = 'SET_CART';
export const SET_CART_OK = 'SET_CART_OK';
export const SET_CART_FAIL = 'SET_CART_FAIL';

export const setCart = (item) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: SET_CART });

      if (!item || typeof item !== 'object') {
        dispatch({
          type: SET_CART_FAIL,
          reason: 'Input is null.',
        });
        return reject('Input is null.');
      }

      let { cart: { data } } = getState();
      // Delete item
      if (item.amount <= 0) {
        data = data.filter(e => e.id !== item.id);
      }
      // Add item
      else {
        let exist = false;
        for (let i = 0; i < data.length; i++) {
          let prevItem = data[i];
          if (prevItem.id === item.id) {
            data[i] = item;
            exist = true;
            break;
          }
        }
        if (!exist) data.push(item);
      }
      storage.set(KEY, data);
      dispatch({
        type: SET_CART_OK,
        reason: null,
        data: {
          data: data,
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
    case TOOGLE_CART_OK:
      return { ...state, ...action.data };
    case TOOGLE_CART_FAIL:
      return { ...state, ...action.data };
    case SET_CART_OK:
      return { ...state, ...action.data };
    case SET_CART_FAIL:
      return { ...state, ...action.data };
    default:
      return state;
  }
}