import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  gap: {
    width: `calc(100% - ${theme.spacing(2)}px)`,
    padding: theme.spacing(2),
  }
}));