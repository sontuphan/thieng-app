/**
 * Contructor
 */
const configs = {}

/**
 * Development configurations
 */
configs.development = {
  base: 'http://localhost:3001',
}

/**
 * Staging configurations
 */
configs.staging = {
  base: 'https://staging-api.thiengviet.com',
}

/**
 * Production configurations
 */
configs.production = {
  base: 'https://api.thiengviet.com',
}

/**
 * Module exports
 */
export default configs;