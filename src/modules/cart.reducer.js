import storage from 'helpers/storage';

const KEY = 'cart';


/**
 * Documents
 * @default defaultData
 */

const defaultState = {
  data: storage.get(KEY) || [],
  visible: false
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
        const er = 'Undifined cart state';
        dispatch({ type: TOOGLE_CART_FAIL, reason: er });
        return reject(er);
      }

      dispatch({ type: TOOGLE_CART_OK, data: { visible: !prevVisible } });
      return resolve(!prevVisible);
    });
  }
}


/**
 * Add cart to storage
 */
export const SET_CART = 'SET_CART';
export const SET_CART_OK = 'SET_CART_OK';
export const SET_CART_FAIL = 'SET_CART_FAIL';

export const setCart = (item) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: SET_CART });

      if (!item || typeof item !== 'object') {
        const er = 'Invalid items';
        dispatch({ type: SET_CART_FAIL, reason: er, });
        return reject(er);
      }

      let { cart: { data } } = getState();
      // Delete item
      if (item.amount <= 0) data = data.filter(e => e._id !== item._id);
      // Add item
      else {
        let exist = false;
        for (let i = 0; i < data.length; i++) {
          let prevItem = data[i];
          if (prevItem._id === item._id) {
            data[i] = item;
            exist = true;
            break;
          }
        }
        if (!exist) data.push(item);
      }
      storage.set(KEY, data);
      dispatch({ type: SET_CART_OK, data: { data: data } });
      return resolve(null);
    });
  }
}

/**
 * Clear cart storage
 */
export const CLEAR_CART = 'CLEAR_CART';
export const CLEAR_CART_OK = 'CLEAR_CART_OK';
export const CLEAR_CART_FAIL = 'CLEAR_CART_FAIL';

export const clearCart = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: CLEAR_CART });

      storage.clear(KEY)
      dispatch({ type: CLEAR_CART_OK, data: { data: [] } });
      return resolve(true);
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
    case CLEAR_CART_OK:
      return { ...state, ...action.data };
    case CLEAR_CART_FAIL:
      return { ...state, ...action.data };
    default:
      return state;
  }
}