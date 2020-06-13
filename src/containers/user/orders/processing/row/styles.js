import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  error: {
    color: theme.palette.error.main,
  },
  warning: {
    color: theme.palette.warning.main,
  },
  success: {
    color: theme.palette.success.main,
  },
  info: {
    color: theme.palette.info.main,
  },
  header: {
    fontWeight: 700,
  }
}));