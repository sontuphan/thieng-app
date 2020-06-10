import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Zoom from '@material-ui/core/Zoom';

import { DeleteRounded } from '@material-ui/icons';

import { FloatCircularProgressButton } from 'components/buttons';


export const useStyles = makeStyles(theme => ({
  float: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  }
}));

function Action(props) {
  const classes = useStyles();
  return <div className={classes.float}>
    <Grid container spacing={2}>
      <Grid item>
        <Zoom in>
          <FloatCircularProgressButton
            color="primary"
            size="small"
            onClick={props.onDelete}
            isLoading={props.isLoading}
          >
            <DeleteRounded />
          </FloatCircularProgressButton>
        </Zoom>
      </Grid>
    </Grid>
  </div>;
}

Action.defaultProps = {
  isLoading: false,
  onDelete: () => { },
}

Action.propTypes = {
  isLoading: PropTypes.bool,
  onDelete: PropTypes.func,
}

export default Action;