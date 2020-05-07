export default theme => ({
  placeholder: {
    color: '#c5c5c5'
  },
  text: {
    overflowWrap: 'break-word',
    '&:empty::before': {
      content: 'attr(placeholder)',
      color: theme.palette.text.hint
    }
  }
});