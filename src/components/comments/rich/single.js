import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';

import { FavoriteRounded, MoreHorizRounded } from '@material-ui/icons';
import { FaPoop } from 'react-icons/fa';

import styles from './styles';

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

  render() {
    let { classes } = this.props;
    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={1} className={classes.noWrap}>
          <Grid item>
            <Avatar className={classes.user} alt={this.props.avatar} src={this.props.avatar} />
          </Grid>
          <Grid item className={classes.stretch}>
            <div className={classes.paper}>
              <Typography><strong className={classes.name}>{this.props.displayname}</strong> - {this.props.comment}</Typography>
            </div>
            <Grid container className={classes.noWrap} justify="space-between" alignItems="center" spacing={1}>
              <Grid item>
                <Typography color="textSecondary" className={classes.date}>{this.props.createdAt}</Typography>
              </Grid>
              <Grid item>
                <Grid container className={classes.noWrap} alignItems="center" spacing={1}>
                  <Grid item>
                    <LikeChip counting={this.props.likeCounting} onClick={this.props.onLike} />
                  </Grid>
                  <Grid item>
                    <DislikeChip counting={this.props.poopCounting} onClick={this.props.onPoop} />
                  </Grid>
                  <Grid item>
                    <IconButton size="small">
                      <MoreHorizRounded fontSize="small" />
                    </IconButton>
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
  likeCounting: 0,
  poopCounting: 0,
  onLike: () => { },
  onPoop: () => { },
}

SingleRichComment.propTypes = {
  avatar: PropTypes.string.isRequired,
  displayname: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  likeCounting: PropTypes.number,
  poopCounting: PropTypes.number,
  onLike: PropTypes.func,
  onPoop: PropTypes.func,
}

export default withStyles(styles)(SingleRichComment);