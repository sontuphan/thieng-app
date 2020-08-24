import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';

import { AddRounded } from '@material-ui/icons';

import { FloatCircularProgressButton } from 'components/buttons';


const useStyles = makeStyles(theme => ({
  button: {
    flexWrap: 'nowrap',
    margin: `0px ${theme.spacing(1)}px`,
  },
  icon: {
    height: 27,
  },
  float: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    maxWidth: 200,
  }
}));

function Action(props) {
  const classes = useStyles();

  return <div className={classes.float}>
    <Grid container spacing={2} justify="flex-end">
      <Grid item>
        <Zoom in>
          <FloatCircularProgressButton
            color="primary"
            size="small"
            variant="extended"
            onClick={props.onAdd}
          >
            <Grid container spacing={1} className={classes.button} alignItems="center">
              <Grid item>
                <Typography>Thêm mới</Typography>
              </Grid>
              <Grid item className={classes.icon}>
                <AddRounded fontSize="small" />
              </Grid>
            </Grid>
          </FloatCircularProgressButton>
        </Zoom>
      </Grid>
    </Grid>
  </div>;
}

Action.defaultProps = {
  onAdd: () => { },
}

Action.propTypes = {
  onAdd: PropTypes.func,
}

export default Action;