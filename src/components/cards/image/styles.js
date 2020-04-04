export default theme => ({
  image: {
    background: 'linear-gradient(42.13deg, #FF9B21 0%, #FF3E3C 50%, #FF3E3C 100%)',
    width: '100%',
    paddingBottom: '100%',
    position: 'relative',
    transition: theme.transitions.create(),
    '&:hover': {
      transform: 'scale(1.03)'
    },
    '&:active': {
      transform: 'scale(1.03)'
    },
    overflow: 'hidden',
    borderRadius: theme.shape.borderRadius,
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
      transform: 'scale(1.05)'
    },
    '&:active': {
      transform: 'scale(1.05)'
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
      transform: 'scale(1.05)'
    },
    '&:active': {
      filter: 'drop-shadow(6px 12px 8px rgba(0, 0, 0, 0.48)) drop-shadow(6px 12px 4px rgba(0, 0, 0, 0.24))',
      transform: 'scale(1.05)'
    }
  },
});