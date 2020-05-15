import configs from 'configs';
import api from 'helpers/api';

const { api: { base, file } } = configs;
const route = `${base}${file}`;

export const loadData = (_id) => {
  return api.get(route, { _id }, true);
}