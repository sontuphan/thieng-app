import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

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
      selected: [],
      multipleChoice: false,
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

  onToogle = (e) => {
    return this.setState({ multipleChoice: e.target.checked });
  }

  onClick = (i) => {
    const { items: { [COMPONENT]: { data } } } = this.props;
    const { multipleChoice } = this.state;
    if (multipleChoice) {
      let { selected } = this.state;
      selected[i] = !selected[i];
      return this.setState({ selected });
    }
    return this.setState({ editableId: data[i]._id, visible: true });
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
    const { items: { [COMPONENT]: { data } } } = this.props;
    const { multipleChoice, selected } = this.state;

    if (!data || !data.length) return null;
    return <Grid container spacing={2}>
      {data.map((obj, i) => <Grid key={i} item xs={6} sm={4} md={3} lg={2}>
        <ProductCard
          itemId={obj._id}
          onClick={() => this.onClick(i)}
          selective={multipleChoice}
          selected={selected[i]}
        />
      </Grid>)}
    </Grid>
  }

  render() {
    // const { classes } = this.props;

    return <Grid container justify="center" spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="flex-end" alignItems="center" spacing={2}>
          <Grid item>
            <Typography>Chọn nhiều sản phẩm</Typography>
          </Grid>
          <Grid item>
            <Switch
              color="primary"
              checked={this.state.multipleChoice}
              onChange={this.onToogle}
            />
          </Grid>
        </Grid>
      </Grid>
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
      <Action
        onAdd={() => this.setState({ editableId: '', visible: true })}
        onDelete={() => { }}
      />
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