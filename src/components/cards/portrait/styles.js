export default theme => ({
  card: {
    width: '100%',
    paddingTop: '180%',
    position: 'relative'
  },
  cardHeader: {
    width: `calc(100% - ${theme.spacing(4)}px)`,
    position: 'absolute',
    top: 0,
    left: 0
  },
  cardMedia: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: `calc(100% - ${theme.spacing(6)}px)`,
    margin: theme.spacing(1),
    padding: `${theme.spacing(2)}px !important`,
    background: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(10px)',
    borderRadius: theme.shape.borderRadius
  }
});