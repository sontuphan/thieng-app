export default theme => ({
  font: {
    ...theme.typography.body1
  },
  noWrap: {
    flexWrap: 'nowrap',
  },
  stretch: {
    flex: '1 1 auto',
  },
  icon: {
    height: 36,
  }
});