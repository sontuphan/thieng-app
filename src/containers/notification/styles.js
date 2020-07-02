export default theme => ({
  noWrap: {
    flexWrap: 'nowrap',
  },
  stretch: {
    flex: '1 1 auto',
  },
  success: {
    backgroundColor: theme.palette.success.main
  },
  info: {
    backgroundColor: theme.palette.info.main
  },
  error: {
    backgroundColor: theme.palette.error.main
  },
  warning: {
    backgroundColor: theme.palette.warning.main
  }
});