import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { BottomDrawer } from 'components/drawers';
import Drain from 'components/drain';
import Stall from 'containers/stall';

import styles from './styles';


class Editor extends Component {
  constructor() {
    super();

    this.state = {
      id: Math.floor(Math.random() * 100)
    }
  }

  render() {
    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <BottomDrawer
          visible={this.props.visible}
          onClose={this.props.onClose}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stall
                id={this.state.id}
                editable
              />
            </Grid>
            <Grid item xs={12}>
              <Drain />
            </Grid>
          </Grid>
        </BottomDrawer>
      </Grid>
    </Grid>
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

Editor.defaultProps = {
  visible: false
}

Editor.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Editor)));