export default theme => ({
  arViewer: {
    width: '100%',
    height: '100%',
    minHeight: 512,
    backgroundColor: 'unset'
  },
  media: {
    height: 250,
  },
  card: {
    transition: theme.transitions.create(),
    '&:hover': {
      boxShadow: theme.shadows[8],
    },
  },
});