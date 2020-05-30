import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export const EditableButtonGroup = function (props) {
  return <Grid container spacing={2}>
    <Grid item xs={4}>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={props.onPublish}
        fullWidth
      >
        <Typography>Publish</Typography>
      </Button>
    </Grid>
    <Grid item xs={4}>
      <Button
        variant="outlined"
        color="primary"
        size="large"
        onClick={props.onSave}
        fullWidth
      >
        <Typography>Save</Typography>
      </Button>
    </Grid>
    <Grid item xs={4}>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={props.onDelete}
        fullWidth
      >
        <Typography>Delete</Typography>
      </Button>
    </Grid>
  </Grid>
}

EditableButtonGroup.defaultProps = {
  onPublish: () => { },
  onSave: () => { },
  onDelete: () => { },
}

EditableButtonGroup.propTypes = {
  onPublish: PropTypes.func,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
}


export const BuyableButtonGroup = function (props) {
  return <Grid container spacing={2}>
    <Grid item xs={6}>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={props.onBuy}
        fullWidth
      >
        <Typography>Mua</Typography>
      </Button>
    </Grid>
    <Grid item xs={6}>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={props.onCancel}
        fullWidth
      >
        <Typography>Huỷ</Typography>
      </Button>
    </Grid>
  </Grid>
}

EditableButtonGroup.defaultProps = {
  onBuy: () => { },
  onCancel: () => { },
}

EditableButtonGroup.propTypes = {
  onBuy: PropTypes.func,
  onCancel: PropTypes.func,
}