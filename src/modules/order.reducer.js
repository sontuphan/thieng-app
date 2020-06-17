import configs from 'configs';
import api from 'helpers/api';


/**
 * Documents
 * @default defaultData
 */

const defaultState = {
  data: [],
  pagination: {
    page: -1,
    limit: 5,
  }
}

/**
 * Get orders
 */
export const GET_ORDERS = 'GET_ORDERS';
export const GET_ORDERS_OK = 'GET_ORDERS_OK';
export const GET_ORDERS_FAIL = 'GET_ORDERS_FAIL';

export const getOrders = (condition, limit, page) => {
  return (dispatch, prevState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: GET_ORDERS });

      const { order: { data, pagination } } = prevState();
      const accumulative = page === pagination.page + 1;
      const { api: { base } } = configs;
      return api.get(`${base}/private/orders`, { condition, limit, page }).then(re => {
        dispatch({
          type: GET_ORDERS_OK,
          data: {
            data: re.data.length ? re.data : (accumulative ? data : re.data),
            pagination: re.data.length ? re.pagination : (accumulative ? pagination : re.pagination),
          }
        });
        return resolve(re.data);
      }).catch(er => {
        dispatch({ type: GET_ORDERS_FAIL, reason: er });
        return reject(er);
      });
    });
  }
}

/**
 * Add order
 */
export const ADD_ORDER = 'ADD_ORDER';
export const ADD_ORDER_OK = 'ADD_ORDER_OK';
export const ADD_ORDER_FAIL = 'ADD_ORDER_FAIL';

export const addOrder = (order) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: ADD_ORDER });

      const { api: { base } } = configs;
      return api.post(`${base}/order`, { order }).then(re => {
        dispatch({ type: ADD_ORDER_OK, reason: null });
        return resolve(re.data);
      }).catch(er => {
        dispatch({ type: ADD_ORDER_FAIL, reason: er });
        return reject(er);
      });
    });
  };
}

/**
 * Update order
 */
export const UPDATE_ORDER = 'UPDATE_ORDER';
export const UPDATE_ORDER_OK = 'UPDATE_ORDER_OK';
export const UPDATE_ORDER_FAIL = 'UPDATE_ORDER_FAIL';

export const updateOrder = (order) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: UPDATE_ORDER });

      const { api: { base } } = configs;
      return api.put(`${base}/order`, { order }).then(re => {
        dispatch({ type: UPDATE_ORDER_OK, reason: null });
        return resolve(re.data);
      }).catch(er => {
        dispatch({ type: UPDATE_ORDER_FAIL, reason: er });
        return reject(er);
      });
    });
  };
}

/**
 * Update order status
 */
export const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS';
export const UPDATE_ORDER_STATUS_OK = 'UPDATE_ORDER_STATUS_OK';
export const UPDATE_ORDER_STATUS_FAIL = 'UPDATE_ORDER_STATUS_FAIL';

export const updateOrderStatus = (order) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: UPDATE_ORDER_STATUS });

      const { api: { base } } = configs;
      return api.put(`${base}/private/order/status`, { order }).then(re => {
        dispatch({ type: UPDATE_ORDER_STATUS_OK, reason: null });
        return resolve(re.data);
      }).catch(er => {
        dispatch({ type: UPDATE_ORDER_STATUS_FAIL, reason: er });
        return reject(er);
      });
    });
  };
}


/**
 * Reducder
 */
export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_ORDERS_OK:
      return { ...state, ...action.data };
    case GET_ORDERS_FAIL:
      return { ...state, ...action.data };
    case ADD_ORDER_OK:
      return { ...state, ...action.data };
    case ADD_ORDER_FAIL:
      return { ...state, ...action.data };
    case UPDATE_ORDER_OK:
      return { ...state, ...action.data };
    case UPDATE_ORDER_FAIL:
      return { ...state, ...action.data };
    case UPDATE_ORDER_STATUS_OK:
      return { ...state, ...action.data };
    case UPDATE_ORDER_STATUS_FAIL:
      return { ...state, ...action.data };
    default:
      return state;
  }
}