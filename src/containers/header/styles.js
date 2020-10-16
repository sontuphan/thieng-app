export default theme => ({
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
  },
  stretch: {
    flex: '1 1 auto',
  },
  link: {
    transition: theme.transitions.create(),
    '&:hover': {
      color: theme.palette.primary.main
    }
  },
});