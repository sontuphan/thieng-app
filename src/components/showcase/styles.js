export default theme => ({
  avatar: {
    width: '41px',
    height: '41px',
  },
  showcase: {
    background: 'linear-gradient(42.13deg, #FF9B21 0%, #FF3E3C 50%, #FF3E3C 100%)'
  },
  slide: {
    background: 'linear-gradient(42.13deg, #FF9B21 0%, #FF3E3C 50%, #FF3E3C 100%)',
    width: `calc(20% - ${theme.spacing(2)}px) !important`,
    padding: theme.spacing(1)
  },
  image: {
    width: '100%',
    height: 'auto'
  }
});