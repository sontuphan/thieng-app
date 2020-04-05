export default theme => ({
  header: {
    height: '70vh',
    position: 'relative',
  },
  panel: {
    width: '100%',
    height: '100vh',
    background: theme.background.primary,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  body: {
    borderRadius: '30px 30px 0px 0px',
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    height: theme.spacing(7),
    width: theme.spacing(7),
  },
});