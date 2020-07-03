import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
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