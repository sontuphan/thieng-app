export default theme => ({
  font: { ...theme.typography.body1 },
  originalPrice: {
    color: theme.palette.action.disabled,
    textDecoration: 'line-through',
  },
});