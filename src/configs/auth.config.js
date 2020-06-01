/**
 * Contructor
 */
const configs = {};

/**
 * Development configurations
 */
configs.development = {
  google: {
    clientId: '114004784341-bk6g9beaf47m6tlkldi22f5vg7lu1k3m.apps.googleusercontent.com',
  },
  facebook: {
    appId: '196596601435084'
  },
  apple: {}
};

/**
 * Staging configurations
 */
configs.staging = {
  google: {},
  facebook: {},
  apple: {}
};

/**
 * Production configurations
 */
configs.production = {
  google: {},
  facebook: {},
  apple: {}
};

/**
 * Module exports
 */
export default configs;