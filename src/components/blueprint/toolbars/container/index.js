import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import {
  EditRounded, DeleteRounded,
  CheckBoxOutlineBlankRounded, CalendarViewDayRounded,
  VideoCallRounded, TextFieldsRounded, AddPhotoAlternateRounded,
} from '@material-ui/icons';

import { useStyles } from './styles';


const ContainerBar = (props) => {
  const classes = useStyles();

  return <Paper className={classes.paper}>
    <Grid container spacing={1}>

      {/* Delete button */}
      <Grid item>
        <IconButton size="small" onClick={props.onDelete}>
          <DeleteRounded fontSize="small" />
        </IconButton>
      </Grid>
      {/* Edit button */}
      <Grid item>
        <IconButton size="small" onClick={props.onEdit}>
          <EditRounded fontSize="small" />
        </IconButton>
      </Grid>

      <Grid item>
        <Divider orientation="vertical" />
      </Grid>

      {/* Add container button */}
      <Grid item>
        <IconButton size="small" onClick={props.onAddContainer}>
          <CheckBoxOutlineBlankRounded fontSize="small" />
        </IconButton>
      </Grid>
      {/* Add image button */}
      <Grid item>
        <IconButton size="small" onClick={props.onAddImage}>
          <AddPhotoAlternateRounded fontSize="small" />
        </IconButton>
      </Grid>
      {/* Add video button */}
      <Grid item>
        <IconButton size="small" onClick={props.onAddVideo} disabled>
          <VideoCallRounded fontSize="small" />
        </IconButton>
      </Grid>
      {/* Add text button */}
      <Grid item>
        <IconButton size="small" onClick={props.onAddText}>
          <TextFieldsRounded fontSize="small" />
        </IconButton>
      </Grid>
      {/* Add drain button */}
      <Grid item>
        <IconButton size="small" onClick={props.onAddDrain}>
          <CalendarViewDayRounded fontSize="small" />
        </IconButton>
      </Grid>

    </Grid>
  </Paper>
}

ContainerBar.defaultProps = {
  onDelete: () => { },
  onEdit: () => { },
  onAddContainer: () => { },
  onAddImage: () => { },
  onAddVideo: () => { },
  onAddText: () => { },
  onAddDrain: () => { },
}

ContainerBar.propTypes = {
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onAddContainer: PropTypes.func,
  onAddImage: PropTypes.func,
  onAddVideo: PropTypes.func,
  onAddText: PropTypes.func,
  onAddDrain: PropTypes.func,
}

export default ContainerBar;