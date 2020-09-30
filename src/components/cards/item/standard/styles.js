import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  noWrap: {
    flexWrap: 'nowrap',
  },
  stretch: {
    flex: '1 1 auto',
  },
  cursor: {
    cursor: 'pointer',
  },
  action: {
    padding: `${theme.spacing(0)}px ${theme.spacing(1)}px !important`
  },
}));