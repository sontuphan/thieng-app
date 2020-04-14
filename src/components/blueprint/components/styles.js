export default theme => ({
  container: {
    position: 'relative',
    background: '#00000010',
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create(),
    '&:hover': {
      background: '#00000020',
    },
  },
  child: {
    position: 'relative',
    '&:hover': {
      '& $tool': {
        display: 'block',
      },
    },
  },
  tool: {
    position: 'absolute',
    top: -theme.spacing(6),
    left: 0,
    margin: theme.spacing(1),
    transition: theme.transitions.create(),
    display: 'none',
  },
  paper: {
    padding: theme.spacing(1) / 2,
  },
  accessibleDrain: {
    backgroundColor: '#00000010',
    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, #ffffff 5px, #ffffff 10px)',
  }
});