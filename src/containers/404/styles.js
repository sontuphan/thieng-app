export default theme => ({
  noWrap: {
    flexWrap: 'nowrap',
  },
  stretch: {
    flex: '1 1 auto',
  },
  navigation: {
    zIndex: theme.zIndex.appBar,
    margin: -theme.spacing(8)
  },
  message: {
    fontSize: theme.spacing(3)
  }
});