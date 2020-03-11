import jwt from 'jsonwebtoken';
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
  if (!accessToken) return false;
  const user = jwt.decode(accessToken);
  if (!user || !user.exp) return false;
  return user.exp * 1000 >= Number(new Date());
}

authentication.getAuthHeader = () => {
  let data = authentication.get();
  if (!data) return null;
  // If the token is invalid, clear auth and reload page
  if (!authentication.verifyAccessToken(data.accessToken)) {
    authentication.clear();
    window.location.reload();
    return null;
  }
  return data.service + ' ' + data.accessToken;
}

authentication.clear = () => {
  storage.clear('auth');
}

export default authentication;