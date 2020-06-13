import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

import { ArrowBackRounded } from '@material-ui/icons';

import { getOrder } from 'modules/bucket.reducer';

import styles from './styles';


class Order extends Component {

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const { orderId } = this.props;
    if (orderId) return getOrder(orderId);
  }

  render() {
    const { classes } = this.props;
    const { visible, orderId, onClose, bucket } = this.props;
    const order = bucket[orderId] || {};

    return <Slide direction="left" in={visible} mountOnEnter unmountOnExit>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container alignItems="center" spacing={2} className={classes.noWrap}>
            <Grid item>
              <IconButton onClick={onClose} size="small">
                <ArrowBackRounded />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography>Quay lại</Typography>
            </Grid>
            <Grid item className={classes.stretch} />
            <Grid item>
              <Typography>{order._id}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Slide>
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  bucket: state.bucket,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getOrder,
}, dispatch);

Order.defaultProps = {
  visible: false,
  onClose: () => { },
}

Order.propTypes = {
  orderId: PropTypes.string,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Order)));