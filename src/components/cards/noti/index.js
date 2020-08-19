import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TweenOne from 'rc-tween-one';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';

import {
  FavoriteRounded, DoneAllRounded, FiberManualRecordRounded,
  ContactSupportRounded, MessageRounded,ThumbDownRounded,
} from '@material-ui/icons';

import styles from './styles';


class NotiCard extends Component {

  renderIcon = (type) => {
    switch (type) {
      case 'like':
        return <FavoriteRounded color="secondary" fontSize="small" />
      case 'dislike':
        return <ThumbDownRounded color="secondary" />
      case 'comment':
        return <MessageRounded color="secondary" fontSize="small" />
      default:
        return <ContactSupportRounded color="secondary" fontSize="small" />
    }
  }

  renderAction = (type) => {
    switch (type) {
      case 'like':
        return 'likes';
      case 'dislike':
        return 'dislike'
      case 'comment':
        return 'comments on';
      default:
        return 'interacts with';
    }
  }

  render() {
    let { classes } = this.props;

    return <Grid container className={classes.noWrap} alignItems="center" spacing={2} >
      <Grid item>
        <Avatar alt={this.props.avatar} src={this.props.avatar} />
      </Grid>
      <Grid item className={classes.iconContainer}>
        {this.renderIcon(this.props.type)}
      </Grid>
      <Grid item className={classes.stretch}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography><strong>{this.props.displayname}</strong> {this.renderAction(this.props.type)} <Link href={this.props.topicLink} color="secondary" className={classes.link}>{this.props.topic}</Link></Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems="center" className={classes.noWrap} spacing={1}>
              <Grid item className={classes.stretch}>
                <Divider />
              </Grid>
              <Grid item>
                <Typography color="textSecondary" className={classes.date}>{this.props.createdAt}</Typography>
              </Grid>
              <Grid item>
                {
                  this.props.read ?
                    <DoneAllRounded color="secondary" fontSize="small" />
                    :
                    <TweenOne animation={{ scale: 1.25, yoyo: true, repeat: -1, }} >
                      <FiberManualRecordRounded color="primary" fontSize="small" />
                    </TweenOne>
                }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid >
  }
}

NotiCard.defaultProps = {
  type: 'others',
  topicLink: '#',
  read: false,
}

NotiCard.propTypes = {
  avatar: PropTypes.string,
  displayname: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  topicLink: PropTypes.string,
  read: PropTypes.bool,
  type: PropTypes.oneOf(['like', 'dislike', 'comment', 'others']),
}

export default withRouter(withStyles(styles)(NotiCard));