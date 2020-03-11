import axios from 'axios';
import authentication from './authentication';

const api = {}

/**
 * CRUD Model
 */

// Create
api.post = (url, params = null, auth = false) => {
  return new Promise((resolve, reject) => {
    let authHeader = authentication.getAuthHeader();
    if (auth && !authHeader) return reject('Unauthentication.');

    axios({
      method: 'post',
      url: url,
      data: params,
      headers: auth ? { 'Authorization': authHeader } : null
    }).then(re => {
      let data = re.data;
      if (data.status === 'ERROR') return reject(data.error);
      return resolve(data);
    }).catch(er => {
      return reject(er);
    });
  });
}

// Read
api.get = (url, params = null, auth = false) => {
  return new Promise((resolve, reject) => {
    let authHeader = authentication.getAuthHeader();
    if (auth && !authHeader) return reject('Unauthentication.');

    axios({
      method: 'get',
      url: url,
      params: params,
      headers: auth ? { 'Authorization': authHeader } : null
    }).then(re => {
      let data = re.data;
      if (data.status === 'ERROR') return reject(data.error);
      return resolve(data);
    }).catch(er => {
      return reject(er);
    });
  });
}

// Update
api.put = (auth = false) => {

}

// Delete
api.delete = (auth = false) => {

}

export default api;