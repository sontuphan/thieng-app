export default theme => ({
  font: {
    ...theme.typography.body1
  },
  avatar: {
    width: '24px',
    height: '24px'
  },
  adornment: {
    marginRight: -theme.spacing(1)
  },
  noWrap: {
    flexWrap: 'nowrap',
  },
  stretch: {
    flex: '1 1 auto',
  },
  paper: {
    width: `calc(100% - ${theme.spacing(2)}px)`,
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    background: theme.background.secondary,
    borderRadius: theme.shape.borderRadius,
    position: 'relative',
  },
  date: {
    fontSize: 10,
  },
  name: {
    cursor: 'pointer',
  }
});