import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Zoom from '@material-ui/core/Zoom';
import { Typography } from '@material-ui/core';

import { ArchiveRounded, HomeWorkRounded } from '@material-ui/icons';

import { FloatCircularProgressButton } from 'components/buttons';


export const useStyles = makeStyles(theme => ({
  button: {
    flexWrap: 'nowrap',
    margin: theme.spacing(1),
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
            onClick={props.onWarehouse}
            isLoading={props.isWarehouse}
          >
            <Grid container spacing={1} className={classes.button} alignItems="center">
              <Grid item>
                <Typography>Chuyển về kho</Typography>
              </Grid>
              <Grid item className={classes.icon}>
                <ArchiveRounded fontSize="small" />
              </Grid>
            </Grid>
          </FloatCircularProgressButton>
        </Zoom>
      </Grid>
      <Grid item>
        <Zoom in>
          <FloatCircularProgressButton
            color="primary"
            size="small"
            variant="extended"
            onClick={props.onFactory}
            isLoading={props.isFactory}
          >
            <Grid container spacing={1} className={classes.button} alignItems="center">
              <Grid item>
                <Typography>Chuyển về xưởng</Typography>
              </Grid>
              <Grid item className={classes.icon}>
                <HomeWorkRounded fontSize="small" />
              </Grid>
            </Grid>
          </FloatCircularProgressButton>
        </Zoom>
      </Grid>
    </Grid>
  </div>;
}

Action.defaultProps = {
  isWarehouse: false,
  onWarehouse: () => { },
  isFactory: false,
  onFactory: () => { },
}

Action.propTypes = {
  isWarehouse: PropTypes.bool,
  onWarehouse: PropTypes.func,
  isFactory: PropTypes.bool,
  onFactory: PropTypes.func,
}

export default Action;