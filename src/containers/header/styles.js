export default theme => {
  console.log(theme)
  return {
    paper: {
      padding: `${theme.spacing(1)}px 0px`,
    },
    avatar: {
      cursor: 'pointer',
      height: 30,
      width: 30
    },
    logo: {
      cursor: 'pointer'
    },
    noWrap: {
      flexWrap: 'noWrap',
    }
  }
};