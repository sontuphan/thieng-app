export default theme => ({
  paper: {
    height: '90%',
    padding: theme.spacing(2),
    overflowX: 'hidden',
  },
  content: {
    margin: theme.spacing(2),
  },
  containerTouchBar: {
    marginTop: -theme.spacing(2),
    paddingTop: theme.spacing(2),
    width: '100%',
    height: 0,
    position: 'sticky',
    top: -theme.spacing(2),
    left: 0,
    backgroundColor: '#ffffff'
  },
  touchBar: {
    position: 'absolute',
    cursor: 'pointer',
    height: theme.spacing(2),
    width: 100,
    top: 0,
    left: 'calc(50% - 50px)',
  },
  touchBarSign: {
    position: 'absolute',
    width: 48,
    height: 4,
    top: 'calc(50% - 2px)',
    left: 'calc(50% - 24px)',
    backgroundColor: '#0000008a',
    borderRadius: 2,
  },
  swipeArea: {
    backgroundColor: '#ff0000'
  }
});