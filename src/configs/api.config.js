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
  base: 'https://staging-api.thiengviet.com',
  auth: '/authentication',
  user: '/user',
}

/**
 * Production configurations
 */
configs.production = {
  base: 'https://api.thiengviet.com',
  auth: '/authentication',
  user: '/user',
}

/**
 * Module exports
 */
export default configs;