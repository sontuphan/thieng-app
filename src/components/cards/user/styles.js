import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  medium: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  noWrap: {
    flexWrap: 'nowrap',
  },
  stretch: {
    color: 'inherit',
    textDecoration: 'none',
    flex: '1 1 auto',
  },
  link: {
    color: 'inherit',
    textDecoration: 'none'
  },
}));