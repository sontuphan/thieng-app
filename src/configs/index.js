import auth from './auth.config';

const env = process.env.REACT_APP_ENV || process.env.NODE_ENV;

const configs = {
  auth: auth[env],
}

/**
 * Module exports
 */
export default configs;
