export default theme => ({
  card: {
    width: '100%',
    paddingTop: '177.777777%',
    position: 'relative'
  },
  cardHeader: {
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
    margin: theme.spacing(1),
    padding: `${theme.spacing(2)}px !important`,
    background: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(10px)',
    borderRadius: theme.shape.borderRadius
  },
  slides: {
    flexWrap: 'nowrap',
    overflow: 'hidden'
  },
  slide: {
    minWidth: '83.333333%'
  }
});