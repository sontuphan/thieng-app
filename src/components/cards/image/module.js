import { useState, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { getFile } from 'modules/bucket.reducer';

export const useData = (_id) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const store = useStore();

  useEffect(() => {
    if (_id) getFile(_id)(dispatch, store.getState).then(re => {
      return setData(re);
    }).catch(er => {
      return setError(er);
    });
  }, [_id]);

  return data || error;
}