import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { CloseRounded } from '@material-ui/icons';

import { setConfirmation } from 'modules/notification.reducer';

import styles from './styles';


class FloatNotification extends Component {

  onClose = () => {
    const { setConfirmation } = this.props;
    return setConfirmation(false);
  }

  render() {
    const { classes } = this.props;
    const { notification: { confirmation } } = this.props;
    return <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
      open={confirmation.visible}
      autoHideDuration={3000}
      onClose={this.onClose}
    >
      <SnackbarContent
        className={classes[confirmation.type]}
        message={<Typography>{confirmation.message}</Typography>}
        action={
          <IconButton size="small" color="inherit" onClick={this.onClose}>
            <CloseRounded fontSize="small" />
          </IconButton>
        }
      />
    </Snackbar>
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  notification: state.notification,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setConfirmation,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FloatNotification)));