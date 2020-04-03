export default theme => ({
  paper: {
    height: '90%',
    padding: theme.spacing(1),
  },
  paperContent: {
    height: `calc(100% + ${theme.spacing(2)}px)`,
  },
  paperBody: {
    height: `calc(100% - ${theme.spacing(2) + 4}px)`,
    overflowY: 'scroll',
  },
  touchBarSign: {
    width: 48,
    height: 4,
    backgroundColor: '#0000008a',
    borderRadius: 2,
  }
});