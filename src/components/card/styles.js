export default theme => ({
  disbaleCard: {
    padding: theme.spacing(2),
    width: `calc(100% - ${theme.spacing(4)}px)`,
    filter: 'grayscale(100%)',
    cursor: 'not-allowed',
  },
  card: {
    padding: theme.spacing(2),
    width: `calc(100% - ${theme.spacing(4)}px)`,
    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    '&:hover': {
      transform: 'scale(1.04)',
      boxShadow: theme.shadows[8]
    },
    '&:hover #image': {
      filter: 'drop-shadow(6px 12px 8px rgba(0, 0, 0, 0.48)) drop-shadow(6px 12px 4px rgba(0, 0, 0, 0.24))',
      transform: 'scale(1.06)'
    },
    '&:active': {
      transform: 'scale(1.04)',
      boxShadow: theme.shadows[8]
    },
    '&:active #image': {
      filter: 'drop-shadow(6px 12px 8px rgba(0, 0, 0, 0.48)) drop-shadow(6px 12px 4px rgba(0, 0, 0, 0.24))',
      transform: 'scale(1.06)'
    },
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    paddingTop: '75%',
    filter: 'drop-shadow(4px 8px 8px rgba(0, 0, 0, 0.24)) drop-shadow(4px 8px 4px rgba(0, 0, 0, 0.12))',
    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  }
});