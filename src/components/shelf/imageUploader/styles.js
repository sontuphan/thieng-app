export default theme => ({
  noWrap: {
    flexWrap: 'nowrap',
  },
  stretch: {
    flex: '1 1 auto',
  },
  disabled: {
    pointerEvents: 'none',
    opacity: 0.5,
    filter: 'grayscale(100%)',
  },
  action: {
    flexWrap: 'nowrap',
    padding: theme.spacing(2),
  }
});