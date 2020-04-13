export default theme => ({
  image: {
    background: theme.background.primary,
    width: '100%',
    paddingBottom: '100%',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer',
    // transition: theme.transitions.create(),
    // '&:hover': {
    //   transform: 'scale(1.02)'
    // }
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
  },
  imagePNG: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: `calc(100% - ${theme.spacing(6)}px)`,
    height: `calc(100% - ${theme.spacing(6)}px)`,
    margin: theme.spacing(3),
    filter: 'drop-shadow(4px 8px 8px rgba(0, 0, 0, 0.24)) drop-shadow(4px 8px 4px rgba(0, 0, 0, 0.12))',
    transition: theme.transitions.create(),
    '&:hover': {
      filter: 'drop-shadow(6px 12px 8px rgba(0, 0, 0, 0.48)) drop-shadow(6px 12px 4px rgba(0, 0, 0, 0.24))',
      transform: 'scale(1.05)'
    },
  },
});