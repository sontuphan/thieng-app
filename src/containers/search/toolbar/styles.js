export default theme => {
  return {
    font: {
      ...theme.typography.body1
    },
    adornment: {
      marginRight: -theme.spacing(1)
    }
  }
};