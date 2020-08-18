export default theme => ({
  noWrap: {
    flexWrap: 'nowrap',
  },
  action: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
  footer: {
    marginTop: -theme.spacing(2)
  },
  text: {
    fontSize: 11
  }
});