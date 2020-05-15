/**
 * Contructor
 */
var configs = {}

/**
 * Development configurations
 */
configs.development = {
  base: 'http://localhost:3001',
  auth: '/authentication',
  user: '/user',
  upload: '/upload',
  item: '/item',
  file: '/file',
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