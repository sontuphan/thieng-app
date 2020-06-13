import { useState, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { getOrder } from 'modules/bucket.reducer';

export const useData = (orderId) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const store = useStore();

  useEffect(() => {
    if (orderId) getOrder(orderId)(dispatch, store.getState).then(re => {
      return setData(re);
    }).catch(er => {
      return setError(er);
    });
  }, [orderId, dispatch, store.getState]);

  return data || error;
}