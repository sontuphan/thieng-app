import { useEffect } from 'react';
import { useDispatch, useStore, useSelector } from 'react-redux';
import { getItem } from 'modules/bucket.reducer';

export const useData = (itemId) => {
  const dispatch = useDispatch();
  const store = useStore();

  useEffect(() => {
    if (itemId) getItem(itemId)(dispatch, store.getState);
  }, [itemId, dispatch, store.getState]);

  const data = useSelector(state => state.bucket[itemId])

  return data;
}