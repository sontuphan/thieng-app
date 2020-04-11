export default theme => ({
  container: {
    position: 'relative',
    minHeight: theme.spacing(6),
    background: '#00000010',
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create(),
    '&:hover': {
      background: '#00000020',
    },
    '&:active': {
      background: '#00000020',
    },
  },
  child: {
    minHeight: theme.spacing(6),
    position: 'relative',
    '&:hover': {
      '& $tool': {
        display: 'block',
      },
    },
    '&:active': {
      '& $tool': {
        display: 'block',
      },
    },
  },
  tool: {
    position: 'absolute',
    top: -theme.spacing(6),
    left: -theme.spacing(1),
    margin: theme.spacing(1),
    width: `calc(100% - ${theme.spacing(2)}px)`,
    transition: theme.transitions.create(),
    display: 'none',
  },
  paper: {
    padding: theme.spacing(1) / 2,
  },
  text: {
    overflowWrap: 'break-word',
  },
  accessibleDrain: {
    backgroundColor: '#00000010',
    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, #ffffff 5px, #ffffff 10px)',
  }
});