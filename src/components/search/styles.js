export default theme => ({
  noWrap: {
    flexWrap: 'nowrap',
  },
  stretch: {
    flex: '1 1 auto',
  },
  contained: {
    padding: theme.spacing(1) / 2,
    backgroundColor: theme.background.secondary,
  },
  startDivider: {
    paddingLeft: '0 !important',
  },
  endDivider: {
    paddingRight: '0 !important',
  },
  startAdornment: {
    marginLeft: -theme.spacing(1)
  },
  endAdornment: {
    marginRight: -theme.spacing(1)
  },
});