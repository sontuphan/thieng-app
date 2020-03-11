/**
 * Contructor
 */
var configs = {}

/**
 * Development configurations
 */
configs.development = {
  base: 'http://localhost:3001',
  auth: {
    origin: '/authentication'
  },
  user: {
    origin: '/user',
  }
}

/**
 * Staging configurations
 */
configs.staging = {

}

/**
 * Production configurations
 */
configs.production = {

}

/**
 * Module exports
 */
export default configs;