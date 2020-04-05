export default theme => ({
  font: {
    ...theme.typography.body1
  },
  avatar: {
    width: '24px',
    height: '24px'
  },
  adornment: {
    marginRight: -theme.spacing(1)
  },
});