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

import { addItem } from 'modules/items.reducer';

import styles from './styles';


class Editor extends Component {
  constructor() {
    super();

    this.state = {
      id: Math.floor(Math.random() * 100)
    }
  }

  /**
   * Creation actions
   */
  onPublish = (value) => {
    console.log(value);
    return this.props.onClose();
  }
  onSave = (value) => {
    return this.props.addItem(value).then(re => {
      console.log(re);
      return this.props.onClose();
    }).catch(er => {
      console.error(er);
    });
  }
  onDelete = () => {

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
                onPublish={this.onPublish}
                onSave={this.onSave}
                onDelete={this.onDelete}
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
  items: state.items,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addItem,
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