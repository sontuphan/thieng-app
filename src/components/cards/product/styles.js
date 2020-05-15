import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  chip: {
    ...theme.typography.body1,
  },
  paper: {
    padding: theme.spacing(1),
    width: `calc(100% - ${theme.spacing(2)}px)`,
    // transition: theme.transitions.create(),
    // '&:hover': {
    //   boxShadow: theme.shadows[8],
    // },
  },
}));