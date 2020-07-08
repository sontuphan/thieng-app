import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  chip: {
    ...theme.typography.body1,
  },
  paper: {
    padding: theme.spacing(2),
    width: `calc(100% - ${theme.spacing(4)}px)`,
    // transition: theme.transitions.create(),
    // '&:hover': {
    //   boxShadow: theme.shadows[8],
    // },
  },
  expansionMore: {
    marginTop: -theme.spacing(6)
  },
  expansionLess: {
    marginTop: -theme.spacing(6)
  },
  subexpansion: {
    borderRadius: theme.shape.borderRadius,
    width: '100%'
  },
  padding: {
    paddingRight: `${theme.spacing(2)}px !important`
  }
}));