import axios from 'axios';
import authentication from './authentication';

const api = {}

/**
 * CRUD Model
 */

// Create
api.post = (url, params = null) => {
  return new Promise((resolve, reject) => {
    const authHeader = authentication.getAuthHeader();
    axios({
      method: 'post',
      url: url,
      data: params,
      headers: authHeader ? { 'Authorization': authHeader } : null
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
api.get = (url, params = null) => {
  return new Promise((resolve, reject) => {
    const authHeader = authentication.getAuthHeader();
    axios({
      method: 'get',
      url: url,
      params: params,
      headers: authHeader ? { 'Authorization': authHeader } : null
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
api.put = (url, params = null) => {
  return new Promise((resolve, reject) => {
    const authHeader = authentication.getAuthHeader();
    axios({
      method: 'put',
      url: url,
      data: params,
      headers: authHeader ? { 'Authorization': authHeader } : null
    }).then(re => {
      let data = re.data;
      if (data.status === 'ERROR') return reject(data.error);
      return resolve(data);
    }).catch(er => {
      return reject(er);
    });
  });
}

// Delete
api.delete = (url, params = null) => {
  return new Promise((resolve, reject) => {
    const authHeader = authentication.getAuthHeader();
    axios({
      method: 'delete',
      url: url,
      data: params,
      headers: authHeader ? { 'Authorization': authHeader } : null
    }).then(re => {
      let data = re.data;
      if (data.status === 'ERROR') return reject(data.error);
      return resolve(data);
    }).catch(er => {
      return reject(er);
    });
  })
}

export default api;