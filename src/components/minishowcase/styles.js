export default theme => ({
  image: {
    background: 'linear-gradient(42.13deg, #FF9B21 0%, #FF3E3C 50%, #FF3E3C 100%)',
    width: '100%',
    paddingTop: '100%',
    borderRadius: theme.shape.borderRadius,
    position: 'relative',
    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    '&:hover': {
      transform: 'scale(1.05)'
    },
    overflow: 'hidden',
    cursor: 'pointer',
  },
  imageJPG: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    '&:hover': {
      transform: 'scale(1.075)'
    }
  },
  imagePNG: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: `calc(100% - ${theme.spacing(4)}px)`,
    height: `calc(100% - ${theme.spacing(4)}px)`,
    margin: theme.spacing(2),
    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    '&:hover': {
      transform: 'scale(1.075)'
    }
  },
  cursor: {
    cursor: 'pointer',
  }
});