export default theme => ({
  link: {
    color: '#000000',
    textDecoration: 'none'
  },
  avatar: {
    width: '41px',
    height: '41px',
  },
  shelf: {
    background: 'linear-gradient(42.13deg, #FF9B21 0%, #FF3E3C 50%, #FF3E3C 100%)'
  },
  slide: {
    width: `calc(20% - ${theme.spacing(2)}px) !important`,
    padding: theme.spacing(1)
  },
  imageShelf: {
    height: '500px',
    lineHeight: '500px',
    filter: 'drop-shadow(6px 12px 8px rgba(0, 0, 0, 0.48)) drop-shadow(6px 12px 4px rgba(0, 0, 0, 0.24))',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
    margin: 'auto',
    display: 'block',
    verticalAlign: 'middle'
  }
});