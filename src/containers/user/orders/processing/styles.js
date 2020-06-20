export default theme => ({
  noWrap: {
    flexWrap: 'nowrap',
  },
  stretch: {
    flex: '1 1 auto',
  },
  startAdornment: {
    marginLeft: -theme.spacing(1)
  },
  endAdornment: {
    marginRight: -theme.spacing(1)
  }
});