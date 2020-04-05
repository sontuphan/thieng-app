import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import { SendRounded } from '@material-ui/icons';

import SingleRichComment from './single';

import styles from './styles';

class RichComment extends Component {
  constructor() {
    super();

    this.state = {
      comment: ''
    }
  }

  onChange = (e) => {
    let comment = e.target.value;
    if (!comment) comment = '';
    this.setState({ comment });
  }

  renderInput = () => {
    let { user, classes } = this.props;
    if (!user || !user.isValid) return null;

    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Nhận xét"
          variant="outlined"
          color="secondary"
          size="small"
          onChange={this.onChange}
          InputProps={{
            classes: {
              input: classes.font,
            },
            startAdornment: (
              <InputAdornment position="start">
                <Avatar className={classes.avatar} alt={user.avatar} src={user.avatar} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="start" className={classes.adornment}>
                <IconButton size="small" onClick={() => this.props.onSend(this.state.comment)}>
                  <SendRounded />
                </IconButton>
              </InputAdornment>
            ),
          }} multiline fullWidth />
      </Grid>
    </Grid>
  }

  renderOutput = () => {
    let { comments } = this.props;
    if (!comments || comments.length === 0) return null;

    return <Grid container spacing={2}>
      {comments.map((comment, i) => <Grid key={i} item xs={12}>
        <SingleRichComment
          avatar={comment.user.avatar}
          displayname={comment.user.displayname}
          comment={comment.comment}
          createdAt={comment.createdAt}
        />
      </Grid>)}
    </Grid>
  }

  render() {
    return <Grid container direction="row" justify="center" spacing={2}>
      <Grid item xs={12}>
        {this.renderInput()}
      </Grid>
      <Grid item xs={12}>
        {this.renderOutput()}
      </Grid>
    </Grid>
  }
}

RichComment.defaultProps = {
  user: null,
  comments: null,
  onSend: () => { },
}

RichComment.propTypes = {
  user: PropTypes.object,
  comments: PropTypes.array,
  onSend: PropTypes.func,
}

export default withStyles(styles)(RichComment);