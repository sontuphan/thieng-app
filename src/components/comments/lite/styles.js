export default theme => ({
  avatar: {
    width: '24px',
    height: '24px',
    marginLeft: -theme.spacing(1),
  },
  adornment: {
    marginRight: -theme.spacing(1),
  },
  name: {
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});