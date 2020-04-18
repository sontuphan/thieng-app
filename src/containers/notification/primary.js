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
import Badge from '@material-ui/core/Badge';

import { ShoppingCartRounded, ExpandMoreRounded } from '@material-ui/icons';

import { EventCard } from 'components/cards';
import Drain from 'components/drain';

import { toogleCart } from 'modules/cart.reducer';
import { toogleNotification, getEvents } from 'modules/notification.reducer';

import styles from './styles';


class PrimaryNotification extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
    }
  }

  componentDidMount() {
    this.props.getEvents();
  }

  onMore = () => {
    this.setState({ isLoading: true }, () => {
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 3000);
    });
  }

  onCart = () => {
    this.props.toogleNotification();
    this.props.toogleCart();
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
            <Typography variant="h3">Event Center</Typography>
          </Grid>
          <Grid item className={classes.stretch} xs={12}>
            <Divider />
          </Grid>
          <Grid item>
            <Badge badgeContent={this.props.cart.data.length} color="primary">
              <Button
                variant="outlined"
                size="small"
                startIcon={<ShoppingCartRounded />}
                onClick={this.onCart}
              >
                <Typography>Open Cart</Typography>
              </Button>
            </Badge>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Drain small />
      </Grid>

      {this.props.notification.events.map(event => <Grid key={event.id} item xs={12}>
        <EventCard
          eventImage={event.eventImage}
          topic={event.topic}
          createdAt={event.createdAt}
          read={event.read}
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
  cart: state.cart,
  notification: state.notification,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toogleCart,
  toogleNotification,
  getEvents,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PrimaryNotification)));