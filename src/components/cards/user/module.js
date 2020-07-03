import { useState, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { getUser } from 'modules/bucket.reducer';

export const useData = (userId) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const store = useStore();

  useEffect(() => {
    if (userId) getUser(userId)(dispatch, store.getState).then(re => {
      return setData(re);
    }).catch(er => {
      return setError(er);
    });
  }, [userId, dispatch, store.getState]);

  return data || error;
}