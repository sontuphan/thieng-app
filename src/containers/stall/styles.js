export default theme => ({
  noWrap: {
    flexWrap: 'nowrap',
  },
  stretch: {
    flex: '1 1 auto',
  },
  originalPrice: {
    color: theme.palette.action.disabled,
    textDecoration: 'line-through',
  },
});