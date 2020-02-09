export default theme => ({
  project: {
    padding: theme.spacing(2),
    width: `calc(100% - ${theme.spacing(4)}px)`,
    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    '&:hover': {
      // transform: 'scale(1.04)',
      boxShadow: theme.shadows[8]
    },
    '&:active': {
      // transform: 'scale(1.04)',
      boxShadow: theme.shadows[8]
    },
    cursor: 'pointer',
  },
  thumbnail: {
    width: '100%',
    paddingTop: '100%'
  }
});