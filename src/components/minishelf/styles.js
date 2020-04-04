export default theme => ({
  font: { ...theme.typography.body1 },
  image: {
    background: theme.background.primary,
    width: '100%',
    paddingTop: '100%',
    borderRadius: theme.shape.borderRadius,
    position: 'relative',
    transition: theme.transitions.create(),
    '&:hover': {
      transform: 'scale(1.04)'
    },
    '&:active': {
      transform: 'scale(1.04)'
    },
    overflow: 'hidden',
    cursor: 'pointer',
  },
  imageJPG: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transition: theme.transitions.create(),
    '&:hover': {
      transform: 'scale(1.06)'
    },
    '&:active': {
      transform: 'scale(1.06)'
    }
  },
  imagePNG: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: `calc(100% - ${theme.spacing(4)}px)`,
    height: `calc(100% - ${theme.spacing(4)}px)`,
    margin: theme.spacing(2),
    filter: 'drop-shadow(4px 8px 8px rgba(0, 0, 0, 0.24)) drop-shadow(4px 8px 4px rgba(0, 0, 0, 0.12))',
    transition: theme.transitions.create(),
    '&:hover': {
      filter: 'drop-shadow(6px 12px 8px rgba(0, 0, 0, 0.48)) drop-shadow(6px 12px 4px rgba(0, 0, 0, 0.24))',
      transform: 'scale(1.06)'
    },
    '&:active': {
      filter: 'drop-shadow(6px 12px 8px rgba(0, 0, 0, 0.48)) drop-shadow(6px 12px 4px rgba(0, 0, 0, 0.24))',
      transform: 'scale(1.06)'
    }
  },
  cursor: {
    cursor: 'pointer',
  }
});