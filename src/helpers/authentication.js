import storage from './storage';

const authentication = {}

authentication.set = (data) => {
  storage.set('auth', data);
}

authentication.get = () => {
  let data = storage.get('auth');
  if (!data || typeof data !== 'object') return null;
  return data;
}

authentication.getAccessToken = () => {
  let data = authentication.get();
  if (!data) return null;
  return data.accessToken;
}

authentication.verifyAccessToken = (accessToken) => {
  return true;
}

authentication.getAuthHeader = () => {
  let data = authentication.get();
  if (!data) return null;
  return data.service + ' ' + data.accessToken;
}

authentication.clear = () => {
  storage.clear('auth');
}

export default authentication;