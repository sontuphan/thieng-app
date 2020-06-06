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
  google: {
    clientId: '114004784341-bk6g9beaf47m6tlkldi22f5vg7lu1k3m.apps.googleusercontent.com',
  },
  facebook: {
    appId: '253210775907246'
  },
  apple: {}
};

/**
 * Production configurations
 */
configs.production = {
  google: {
    clientId: '136230061935-9n99neq7tglljcshks7intu5vtrhnl5d.apps.googleusercontent.com',
  },
  facebook: {
    appId: '1205622886439533'
  },
  apple: {}
};

/**
 * Module exports
 */
export default configs;