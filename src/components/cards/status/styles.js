export default theme => ({
  paper: {
    padding: theme.spacing(2),
    width: `calc(100% - ${theme.spacing(4)}px)`,
    transition: theme.transitions.create(),
    '&:hover': {
      boxShadow: theme.shadows[12]
    },
    '&:active': {
      boxShadow: theme.shadows[12]
    },
    cursor: 'pointer',
  }
});