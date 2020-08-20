import { useState, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { getItem, getFile } from 'modules/bucket.reducer';

export const useData = (itemId) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const store = useStore();

  useEffect(() => {
    if (itemId) getItem(itemId)(dispatch, store.getState).then(re => {
      return getFile(re.thumbnailId)(dispatch, store.getState);
    }).then(re => {
      return setData(re);
    }).catch(er => {
      return setError(er);
    });
  }, [itemId, dispatch, store.getState]);

  return data || error;
}