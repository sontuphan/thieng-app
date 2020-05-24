import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    width: `calc(100% - ${theme.spacing(4)}px)`,
    // transition: theme.transitions.create(),
    // '&:hover': {
    //   boxShadow: theme.shadows[8],
    // },
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  }
}));