export default theme => ({
  font: { ...theme.typography.body1 },
  paper: {
    padding: theme.spacing(1),
    width: `calc(100% - ${theme.spacing(2)}px)`,
    transition: theme.transitions.create(),
    '&:hover': {
      boxShadow: theme.shadows[8],
    },
    '&:active': {
      boxShadow: theme.shadows[8],
    },
    cursor: 'pointer',
  },
});