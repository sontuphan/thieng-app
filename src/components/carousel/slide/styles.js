export default theme => ({
  root: {
    padding: `0px ${window.innerWidth >= 500 ? '15%' : '0px'}`,
  },
  slide: {
    width: `calc(100% - ${theme.spacing(2)}px) !important`,
    margin: `0px ${theme.spacing(1)}px !important`,
    overflow: 'hidden !important',
  }
});