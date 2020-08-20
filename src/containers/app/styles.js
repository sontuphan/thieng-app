export default theme => {
  console.info(theme)
  return {
    safe: {
      margin: -theme.spacing(1) / 2
    }
  }
};