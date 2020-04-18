import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TweenOne from 'rc-tween-one';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

import { DoneAllRounded, FiberManualRecordRounded, } from '@material-ui/icons';

import styles from './styles';


class EventCard extends Component {

  render() {
    let { classes } = this.props;

    return <Grid
      container
      className={classes.noWrap}
      alignItems="center"
      spacing={2}
    >
      {this.props.eventImage ? <Grid item>
        <Avatar alt={this.props.eventImage} src={this.props.eventImage} />
      </Grid> : null}
      <Grid item className={classes.stretch}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography>
              <Link href={this.props.topicLink} color="secondary" className={classes.link}>{this.props.topic}</Link>
            </Typography>
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

EventCard.defaultProps = {
  topicLink: '#',
  read: false,
}

EventCard.propTypes = {
  eventImage: PropTypes.string,
  topic: PropTypes.string.isRequired,
  topicLink: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  read: PropTypes.bool,
}

export default withRouter(withStyles(styles)(EventCard));