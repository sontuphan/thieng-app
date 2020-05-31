import { useState, useEffect } from 'react';
import configs from 'configs';
import api from 'helpers/api';

export const useData = (_id) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const { api: { base } } = configs;
    let blueprint = null;
    if (_id) api.get(`${base}/blueprint`, { _id }).then(re => {
      blueprint = re.data;
      return api.get(`${base}/social/users`, { _id: blueprint.userId })
    }).then(re => {
      blueprint.author = re.data[0]
      return setData(blueprint);
    }).catch(er => {
      return setError(er);
    });
  }, [_id]);

  return data || error;
}