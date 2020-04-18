import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { AlarmOnRounded, ExpandMoreRounded } from '@material-ui/icons';

import { NotiCard } from 'components/cards';
import Drain from 'components/drain';

import { getNotification } from 'modules/notification.reducer';
import { toogleCart } from 'modules/cart.reducer';

import styles from './styles';


class SecondaryNotification extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
    }
  }

  componentDidMount() {
    this.props.getNotification();
  }

  onMore = () => {
    this.setState({ isLoading: true }, () => {
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 3000);
    });
  }

  render() {
    let { classes } = this.props;
    return <Grid container justify="center" spacing={2}>

      <Grid item xs={12}>
        <Drain small />
      </Grid>

      <Grid item xs={12}>
        <Grid
          container
          alignItems="center"
          className={classes.noWrap}
          spacing={2}
        >
          <Grid item>
            <Typography variant="h3">Notification Center</Typography>
          </Grid>
          <Grid item className={classes.stretch} xs={12}>
            <Divider />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<AlarmOnRounded />}
            >
              <Typography>Mark read</Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Drain small />
      </Grid>

      {this.props.notification.notification.map(noti => <Grid key={noti.id} item xs={12}>
        <NotiCard
          type={noti.type}
          avatar={noti.avatar}
          displayname={noti.displayname}
          topic={noti.topic}
          createdAt={noti.createdAt}
          read={noti.read}
        />
      </Grid>)}

      <Grid item >
        <Button
          size="small"
          endIcon={this.state.isLoading ? <CircularProgress size={16} /> : <ExpandMoreRounded fontSize="small" />}
          onClick={this.onMore}
          disabled={this.state.isLoading}
        >
          <Typography>More</Typography>
        </Button>
      </Grid>

    </Grid>
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth,
  notification: state.notification,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getNotification,
  toogleCart,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SecondaryNotification)));