import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import isEqual from 'react-fast-compare';

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
  DeleteRounded
} from '@material-ui/icons';
import { FaPoop } from 'react-icons/fa';

import { getComment, getUser } from 'modules/bucket.reducer';

import styles from './styles';
import utils from 'helpers/utils';

/**
 * LikeChip
 * @param {*} props 
 */
function LikeChip(props) {
  return <Chip
    color="primary"
    size="small"
    deleteIcon={<FavoriteRounded />}
    label={props.counting}
    onDelete={props.onClick}
    onClick={props.onClick}
  />
}

LikeChip.defaultProps = {
  counting: 0,
  onClick: () => { },
}

LikeChip.propTypes = {
  counting: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}


/**
 * DislikeChip
 * @param {*} props 
 */
function DislikeChip(props) {
  return <Chip
    color="secondary"
    size="small"
    deleteIcon={<FaPoop style={{ height: 13, padding: "1px 0px 2px 0px" }} />}
    label={props.counting}
    onDelete={props.onClick}
    onClick={props.onClick}
  />
}

DislikeChip.defaultProps = {
  counting: 0,
  onClick: () => { },
}

DislikeChip.propTypes = {
  counting: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}


/**
 * A SingleRichComment
 */
class SingleRichComment extends Component {
  constructor() {
    super();

    this.state = {
      anchorEl: null
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
    const { commentId, getComment, getUser } = this.props;
    return getComment(commentId).then(re => {
      return getUser(re.userId);
    }).catch(console.error);
  }

  onMore = (e) => {
    return this.setState({ anchorEl: e.currentTarget });
  }

  onClose = () => {
    return this.setState({ anchorEl: null });
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
    const { bucket, commentId } = this.props;
    const { onLike, onPoop } = this.props;
    const comment = bucket[commentId];
    if (!comment) return null;
    const user = bucket[comment.userId];
    if (!user) return null;

    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={1} className={classes.noWrap}>
          <Grid item>
            <Avatar className={classes.user} alt={user.avatar} src={user.avatar} />
          </Grid>
          <Grid item className={classes.stretch}>
            <div className={classes.paper}>
              <Typography><strong className={classes.name}>{user.displayname}</strong> - {comment.contents}</Typography>
            </div>
            <Grid container className={classes.noWrap} justify="space-between" alignItems="center" spacing={1}>
              <Grid item>
                <Typography color="textSecondary" className={classes.date}>{utils.prettyDatetime(comment.createdAt)}</Typography>
              </Grid>
              <Grid item>
                <Grid container className={classes.noWrap} alignItems="center" spacing={1}>
                  <Grid item>
                    <LikeChip counting={comment.likeUserIds.length} onClick={onLike} />
                  </Grid>
                  <Grid item>
                    <DislikeChip counting={comment.dislikeUserIds.length} onClick={onPoop} />
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
  onLike: () => { },
  onPoop: () => { },
  onDelete: () => { },
}

SingleRichComment.propTypes = {
  onLike: PropTypes.func,
  onPoop: PropTypes.func,
  onDelete: PropTypes.func,
  commentId: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  bucket: state.bucket,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getComment, getUser,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SingleRichComment)));