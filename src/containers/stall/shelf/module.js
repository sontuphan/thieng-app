import { useState, useEffect } from 'react';
import configs from 'configs';
import api from 'helpers/api';

export const useData = (_id) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const { api: { base } } = configs;
    if (_id) api.get(`${base}/item`, { _id }, true).then(re => {
      return setData(re.data);
    }).catch(er => {
      return setError(er);
    });
  }, [_id]);

  return data || error;
}