/**
 * Contructor
 */
const configs = {}

/**
 * Development configurations
 */
configs.development = {
  base: 'http://localhost:3001',
  auth: '/authentication',
  user: '/user',
}

/**
 * Staging configurations
 */
configs.staging = {
  base: 'http://103.69.193.244:3001',
  auth: '/authentication',
  user: '/user',
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