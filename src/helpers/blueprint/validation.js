import { PREDEFINED_TYPES } from './constants';

/**
 * Helpers
 */
const validateURL = function (str) {
  var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return !!pattern.test(str);
}


/**
 * Container validation 
 */

const validateContainerWidth = function (width) {
  if (!width) return false;
  if (typeof width !== 'number') return false;
  if (!Number.isInteger(width)) return false;
  if (!PREDEFINED_TYPES.container.width.includes(width)) return false;
  return true;
}

const validateContainerJustify = function (justify) {
  if (!justify) return false;
  if (typeof justify !== 'string') return false;
  if (!PREDEFINED_TYPES.container.justify.includes(justify)) return false;
  return true;
}

const validateContainerAlign = function (align) {
  if (!align) return false;
  if (typeof align !== 'string') return false;
  if (!PREDEFINED_TYPES.container.align.includes(align)) return false;
  return true;
}

export { validateContainerWidth, validateContainerJustify, validateContainerAlign }


/**
 * Image validation
 */

const validateImageUrl = function (url) {
  if (!url) return false;
  if (typeof url !== 'string') return false;
  if (!validateURL(url)) return false;
  return true;
}

export { validateImageUrl }


/**
 * Video validation
 */

const validateVideoUrl = function (url) {
  if (!url) return false;
  if (typeof url !== 'string') return false;
  if (!validateURL(url)) return false;
  return true;
}

export { validateVideoUrl }


/**
 * Text validation
 */

const validateTextContent = function (content) {
  if (!content) return false;
  if (typeof content !== 'string') return false;
  return true;
}

const validateTextVariant = function (variant) {
  if (!variant) return false;
  if (typeof variant !== 'string') return false;
  if (!PREDEFINED_TYPES.text.variant.includes(variant)) return false;
  return true;
}

export { validateTextContent, validateTextVariant }


/**
 * Drain validation
 */

const validateDrainHeight = function (height) {
  if (!height) return false;
  if (typeof height !== 'number') return false;
  if (!Number.isInteger(height)) return false;
  if (height < 1 || height > 1000) return false;
  return true;
}

export { validateDrainHeight }