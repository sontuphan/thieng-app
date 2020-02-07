export default theme => ({
  font: {
    ...theme.typography.body1
  },
  denseAvatar: {
    width: '24px',
    height: '24px'
  },
  adornment: {
    marginRight: -theme.spacing(1)
  },
});