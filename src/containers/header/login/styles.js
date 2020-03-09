export default theme => {
  return {
    font: {
      ...theme.typography.body1
    },
    adornment: {
      marginRight: 0
    },
    route: {
      margin: '10px 0px 10px 20px'
    },
    logo: {
      cursor: 'pointer'
    },
    drawer: {
      minWidth: '240px'
    },
  }
};