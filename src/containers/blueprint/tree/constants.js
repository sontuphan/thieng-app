const PREDEFINED_TYPES = {
  root: {
    children: ['container'],
  },
  container: {
    width: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    justify: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
    alignItems: ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'],
    children: ['container', 'image', 'video', 'text', 'drain'],
  },
  image: {
    url: null,
  },
  video: {
    url: null,
  },
  text: {
    variant: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2'],
    align: ['left', 'center', 'right', 'justify'],
    content: '',
  },
  drain: {
    height: null,
  }
}

const DEFAULT_ROOT = {
  type: 'root',
  children: null,
}

const DEFAULT_CONTAINER = {
  type: 'container',
  width: 12,
  justify: 'flex-start',
  alignItems: 'flex-start',
  children: null,
}

const DEFAULT_IMAGE = {
  type: 'image',
  url: 'https://source.unsplash.com/random/',
}

const DEFAULT_VIDEO = {
  type: 'video',
  url: 'https://source.unsplash.com/random/',
}

const DEFAULT_TEXT = {
  type: 'text',
  variant: 'body1',
  align: 'left',
  contents: 'Type something here',
}

const DEFAULT_DRAIN = {
  type: 'drain',
  height: 96,
}

export {
  PREDEFINED_TYPES,
  DEFAULT_ROOT,
  DEFAULT_CONTAINER,
  DEFAULT_IMAGE,
  DEFAULT_VIDEO,
  DEFAULT_TEXT,
  DEFAULT_DRAIN
}
