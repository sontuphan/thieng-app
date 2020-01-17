export default theme => {
  console.log(theme)
  return {
    route: {
      margin: '10px 0px 10px 20px'
    },
    logo: {
      cursor: 'pointer'
    },
    drawer: {
      minWidth: '240px'
    }
  }
};