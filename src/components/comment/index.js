import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import { Send } from '@material-ui/icons';

import Divider from 'components/divider';

import styles from './styles';

class Comment extends Component {

  renderInput = (user) => {
    if (!user || !user.isLoggedIn) return null;

    let { classes } = this.props;
    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <Avatar alt={user.avatar} src={user.avatar} />
          </Grid>
          <Grid item xs={8}>
            <Typography noWrap>{user.displayname}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TextField label="Nhận xét" variant="outlined" color="secondary" size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start" className={classes.adornment}>
                <IconButton size="small" onClick={this.props.onSend}>
                  <Send />
                </IconButton>
              </InputAdornment>
            ),
          }} multiline fullWidth />
      </Grid>
    </Grid>
  }

  renderOutput = (comments) => {
    return <Grid container spacing={2}>
      {comments.map((comment, i) => <Fragment key={i}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Divider />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <Avatar alt={comment.user.avatar} src={comment.user.avatar} />
            </Grid>
            <Grid item xs={8}>
              <Typography noWrap>{comment.user.displayname}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography>{comment.comment}</Typography>
        </Grid>
      </Fragment>)}
    </Grid>
  }

  render() {
    return <Fragment>
      <Grid container direction="row" justify="center" spacing={2}>
        <Grid item xs={12}>
          {this.renderInput(this.props.user)}
        </Grid>
        <Grid item xs={12}>
          {this.renderOutput(this.props.comments)}
        </Grid>
      </Grid>
    </Fragment>
  }
}

Comment.propTypes = {
  user: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  onSend: PropTypes.func.isRequired,
}

export default withRouter(withStyles(styles)(Comment));