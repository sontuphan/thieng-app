export default theme => {
  console.log(theme)
  return {
    route: {
      margin: `${theme.spacing(1)}px 0px ${theme.spacing(1)}px ${theme.spacing(2)}px`
    },
    logo: {
      cursor: 'pointer'
    },
  }
};