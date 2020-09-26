import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  cursor:{
    cursor: 'pointer',
  },
  collapse: {
    borderRadius: theme.shape.borderRadius,
  },
}));