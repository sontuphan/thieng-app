import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  radio: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
  paper: {
    position: 'relative',
    padding: theme.spacing(1),
    width: `calc(100% - ${theme.spacing(2)}px)`,
    // transition: theme.transitions.create(),
    // '&:hover': {
    //   boxShadow: theme.shadows[8],
    // },
  },
}));