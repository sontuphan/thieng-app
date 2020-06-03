import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { BottomDrawer } from 'components/drawers';
import { ProductCard } from 'components/cards';
import Drain from 'components/drain';
import Stall from 'containers/stall';
import Action from './action';

import { getItems } from 'modules/items.reducer';
import { addItem, updateItem } from 'modules/items.reducer';

import styles from './styles';

const COMPONENT = 'creation';


class Creation extends Component {
  constructor() {
    super();

    this.state = {
      editableId: '',
      visible: false,
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    let { items: { [COMPONENT]: { pagination: { limit, page } } } } = this.props;
    let condition = { status: 'creating' }
    return this.props.getItems(condition, limit, page + 1, COMPONENT);
  }

  onClick = (editableId) => {
    return this.setState({ editableId, visible: true });
  }

  onAdd = (value) => {
    return this.props.addItem(value).then(re => {
      return this.setState({ visible: false });
    }).catch(console.error);
  }

  onUpdate = (value) => {
    return this.props.updateItem(value).then(re => {
      return this.setState({ visible: false });
    }).catch(console.error);
  }

  renderItems = () => {
    let { items: { [COMPONENT]: { data } } } = this.props;
    if (!data || !data.length) return null;
    return <Grid container spacing={2}>
      {data.map(obj => <Grid key={obj._id} item xs={6} sm={4} md={3} lg={2}>
        <ProductCard
          itemId={obj._id}
          onClick={() => this.setState({ editableId: obj._id, visible: true })}
        />
      </Grid>)}
    </Grid>
  }

  render() {
    // const { classes } = this.props;

    return <Grid container justify="center" spacing={2}>
      <Grid item xs={12}>
        {this.renderItems()}
      </Grid>
      <Grid item xs={12}>
        <BottomDrawer
          visible={this.state.visible}
          onClose={() => this.setState({ visible: false })}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stall
                itemId={this.state.editableId}
                onAdd={this.onAdd}
                onUpdate={this.onUpdate}
                editable
              />
            </Grid>
            <Grid item xs={12}>
              <Drain />
            </Grid>
          </Grid>
        </BottomDrawer>
      </Grid>
      <Action onAdd={() => this.setState({ editableId: '', visible: true })} />
    </Grid>
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  items: state.items,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getItems,
  addItem, updateItem,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Creation)));