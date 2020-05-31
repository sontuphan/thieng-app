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


class Creator extends Component {

  /**
   * Creation actions
   */
  onAddItem = (value) => {
    return this.props.addItem(value).then(re => {
      return this.props.onClose();
    }).catch(console.error);
  }
  onDeleteItem = () => {

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
                itemId={this.props.itemId}
                onAdd={this.onAddItem}
                onDelete={this.onDeleteItem}
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

Creator.defaultProps = {
  visible: false,
  onClose: () => { },
}

Creator.propTypes = {
  itemId: PropTypes.string.isRequired,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Creator)));