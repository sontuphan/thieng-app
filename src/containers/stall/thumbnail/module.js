import { useState, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { getFile } from 'modules/bucket.reducer';

export const useData = (fileId) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const store = useStore();

  useEffect(() => {
    if (fileId) getFile(fileId)(dispatch, store.getState).then(re => {
      return setData(re);
    }).catch(er => {
      return setError(er);
    });
  }, [fileId, dispatch, store.getState]);

  return data || error;
}