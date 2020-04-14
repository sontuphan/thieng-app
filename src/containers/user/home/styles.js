export default theme => ({
  font: {
    ...theme.typography.body1
  },
  noWrap: {
    flexWrap: 'nowrap'
  },
  fixAlign: {
    marginRight: theme.spacing(2)
  }
});