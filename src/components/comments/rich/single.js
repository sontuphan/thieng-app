import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import isEqual from 'react-fast-compare';
import { Link as RouterLink } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import {
  FavoriteRounded, MoreHorizRounded, EditRounded,
  DeleteRounded, CheckRounded, ThumbDownRounded,
} from '@material-ui/icons';

import { getComment, getUser } from 'modules/bucket.reducer';
import {
  getFeeling, getFeelings,
  addFeeling, updateFeeling, deleteFeeling
} from 'modules/feelings.reducer';
import { setConfirmation } from 'modules/notification.reducer';

import styles from './styles';
import utils from 'helpers/utils';

const DEFAULT_FEELING = {
  like: 0,
  dislike: 0
}


/**
 * LikeChip
 * @param {*} props 
 */
function LikeChip(props) {
  return <Chip
    color="primary"
    size="small"
    icon={props.active ? <CheckRounded /> : null}
    deleteIcon={<FavoriteRounded />}
    label={props.counting}
    onDelete={props.onClick}
    onClick={props.onClick}
  />
}

LikeChip.defaultProps = {
  active: false,
  counting: 0,
  onClick: () => { },
}

LikeChip.propTypes = {
  active: PropTypes.bool,
  counting: PropTypes.number,
  onClick: PropTypes.func,
}


/**
 * DislikeChip
 * @param {*} props 
 */
function DislikeChip(props) {
  return <Chip
    color="secondary"
    size="small"
    icon={props.active ? <CheckRounded /> : null}
    deleteIcon={<ThumbDownRounded />}
    label={props.counting}
    onDelete={props.onClick}
    onClick={props.onClick}
  />
}

DislikeChip.defaultProps = {
  active: false,
  counting: 0,
  onClick: () => { },
}

DislikeChip.propTypes = {
  active: PropTypes.bool,
  counting: PropTypes.number,
  onClick: PropTypes.func,
}


/**
 * A SingleRichComment
 */
class SingleRichComment extends Component {
  constructor() {
    super();

    this.state = {
      anchorEl: null,
      you: {},
    }
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { commentId } = this.props;
    if (!isEqual(commentId, prevProps.commentId))
      this.loadData();
  }

  loadData = () => {
    const { commentId, auth } = this.props;
    const { getComment, getUser, getFeeling, getFeelings } = this.props;
    return getComment(commentId).then(re => {
      return getUser(re.userId);
    }).then(re => {
      return getFeeling({ targetId: commentId, userId: auth._id });
    }).then(re => {
      return this.setState({ you: re }, () => {
        return getFeelings(commentId);
      });
    }).catch(console.error);
  }

  onMore = (e) => {
    return this.setState({ anchorEl: e.currentTarget });
  }

  onClose = () => {
    return this.setState({ anchorEl: null });
  }

  onAction = (type) => {
    const { commentId } = this.props;
    if (!commentId) return console.log('Invalid ID');

    const { you } = this.state;
    const { addFeeling, updateFeeling, deleteFeeling } = this.props;
    let action = null;
    if (!you || !you.type) action = addFeeling;
    else if (you && you.type === type) action = deleteFeeling;
    else if (you && you.type !== type) action = updateFeeling;
    else return console.log('Invalid types');

    const feeling = { targetId: commentId, type }
    const { auth, setConfirmation, getFeeling, getFeelings } = this.props;
    return action(feeling).then(re => {
      return getFeeling({ targetId: commentId, userId: auth._id }).then(re => {
        return this.setState({ you: re }, () => {
          return getFeelings(commentId);
        });
      }).catch(console.error);
    }).catch(er => {
      return setConfirmation(true, 'Không thể tưởng tác bình luận này', 'error');
    });
  }

  onEdit = () => {
    this.props.onEdit();
    return this.onClose();
  }

  onDelete = () => {
    this.props.onDelete();
    return this.onClose();
  }

  render() {
    const { classes } = this.props;
    const { bucket, feelings: { data }, commentId } = this.props;
    const comment = bucket[commentId];
    if (!comment) return null;
    const { you } = this.state;
    const feeling = { ...DEFAULT_FEELING, ...data[commentId] };

    const user = bucket[comment.userId];
    if (!user) return null;

    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={1} className={classes.noWrap}>
          <Grid item component={RouterLink} to={`/user/${user._id}`}>
            <Avatar className={classes.user} alt={user.avatar} src={user.avatar} />
          </Grid>
          <Grid item className={classes.stretch}>
            <div className={classes.paper}>
              <Typography>
                <RouterLink className={classes.name} to={`/user/${user._id}`}>{user.displayname}</RouterLink> - {comment.contents}
                </Typography>
            </div>
            <Grid container className={classes.noWrap} justify="space-between" alignItems="center" spacing={1}>
              <Grid item>
                <Typography color="textSecondary" className={classes.date}>{utils.prettyDatetime(comment.createdAt)}</Typography>
              </Grid>
              <Grid item>
                <Grid container className={classes.noWrap} alignItems="center" spacing={1}>
                  <Grid item>
                    <LikeChip
                      active={you && (you.type === 'like')}
                      counting={feeling.like}
                      onClick={() => this.onAction('like')}
                    />
                  </Grid>
                  <Grid item>
                    <DislikeChip
                      active={you && (you.type === 'dislike')}
                      counting={feeling.dislike}
                      onClick={() => this.onAction('dislike')}
                    />
                  </Grid>
                  <Grid item>
                    <IconButton size="small" onClick={this.onMore}>
                      <MoreHorizRounded fontSize="small" />
                    </IconButton>
                    <Menu
                      anchorEl={this.state.anchorEl}
                      open={Boolean(this.state.anchorEl)}
                      onClose={this.onClose}
                      keepMounted
                    >
                      <MenuItem onClick={this.onEdit} disabled>
                        <ListItemIcon className={classes.listItem}>
                          <EditRounded fontSize="small" />
                        </ListItemIcon>
                        <Typography>Chỉnh sửa</Typography>
                      </MenuItem>
                      <MenuItem onClick={this.onDelete}>
                        <ListItemIcon className={classes.listItem}>
                          <DeleteRounded fontSize="small" />
                        </ListItemIcon>
                        <Typography>Xóa</Typography>
                      </MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  }
}

SingleRichComment.defaultProps = {
  onDelete: () => { },
}

SingleRichComment.propTypes = {
  onDelete: PropTypes.func,
  commentId: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  bucket: state.bucket,
  feelings: state.feelings,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getComment,
  getUser,
  getFeeling, getFeelings,
  addFeeling, updateFeeling, deleteFeeling,
  setConfirmation,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SingleRichComment)));