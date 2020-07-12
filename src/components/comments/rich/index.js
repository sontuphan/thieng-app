import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import isEqual from 'react-fast-compare';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { SendRounded, ExpandMoreRounded } from '@material-ui/icons';

import SingleRichComment from './single';
import { CircularProgressButton } from 'components/buttons';

import {
  getComments, addComment, updateComments,
  deleteComment,
} from 'modules/comments.reducer';
import { setConfirmation } from 'modules/notification.reducer';

import styles from './styles';


class RichComment extends Component {
  constructor() {
    super();

    this.state = {
      contents: '',
      isLoading: false,
    }
  }

  componentDidMount() {
    const { comments: { pagination: { limit } } } = this.props;
    this.loadData(limit, 0);
  }

  componentDidUpdate(prevProps) {
    const { targetId } = this.props;
    if (!isEqual(targetId, prevProps.targetId)) {
      const { comments: { pagination: { limit } } } = this.props;
      this.loadData(limit, 0);
    }
  }

  loadData = (limit, page) => {
    const { targetId } = this.props;
    return this.setState({ isLoading: true }, () => {
      return this.props.getComments({ targetId }, limit, page).then(() => {
        return this.setState({ isLoading: false });
      }).catch(console.error);
    });
  }

  onChange = (e) => {
    const contents = e.target.value || '';
    return this.setState({ contents });
  }

  onSend = () => {
    const { targetId, addComment, setConfirmation } = this.props;
    const { contents } = this.state;
    if (!targetId || !contents) return console.error('Invalid inputs');
    const newComment = { targetId, contents }
    return addComment(newComment).then(re => {
      let { updateComments, comments: { data } } = this.props;
      data.unshift({ _id: re._id });
      return this.setState({ contents: '' }, () => {
        return updateComments(data);
      });
    }).catch(er => {
      return setConfirmation(true, 'Không thể bình luận sản phẩm này', 'error');
    });
  }

  onDelete = (commentId) => {
    const { deleteComment, setConfirmation } = this.props;
    return deleteComment({ _id: commentId }).then(re => {
      let { updateComments, comments: { data } } = this.props;
      data = data.filter(comment => comment._id !== re._id);
      return updateComments(data);
    }).catch(er => {
      return setConfirmation(true, 'Không thể xóa bình luận này', 'error');
    });
  }

  onMore = () => {
    const { comments: { pagination: { limit, page } } } = this.props;
    return this.loadData(limit, page + 1);
  }

  renderInput = () => {
    const { classes } = this.props;
    const { auth } = this.props;

    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Nhận xét"
          variant="outlined"
          color="secondary"
          size="small"
          value={this.state.contents}
          onChange={this.onChange}
          className={classes.input}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Avatar className={classes.avatar} alt={auth.avatar} src={auth.avatar} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="start" className={classes.adornment}>
                <IconButton size="small" onClick={this.onSend} disabled={!this.state.contents}>
                  <SendRounded fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          multiline
          fullWidth
        />
      </Grid>
    </Grid>
  }

  renderOutput = () => {
    const { comments: { data } } = this.props;
    if (!data || data.length === 0) return null;
    return <Grid container spacing={2}>
      {data.map((comment, i) => <Grid key={i} item xs={12}>
        <SingleRichComment
          commentId={comment._id}
          onDelete={() => this.onDelete(comment._id)}
        />
      </Grid>)}
    </Grid>
  }

  render() {
    return <Grid container justify="center" spacing={2}>
      <Grid item xs={12}>
        {this.renderInput()}
      </Grid>
      <Grid item xs={12}>
        {this.renderOutput()}
      </Grid>
      <Grid item>
        <CircularProgressButton
          size="small"
          endIcon={<ExpandMoreRounded fontSize="small" />}
          onClick={this.onMore}
          isLoading={this.state.isLoading}
        >
          <Typography>Thêm</Typography>
        </CircularProgressButton>
      </Grid>
    </Grid>
  }
}

RichComment.propTypes = {
  targetId: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  comments: state.comments,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getComments, addComment, updateComments,
  deleteComment,
  setConfirmation,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(RichComment)));