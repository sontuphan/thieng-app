import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import async from 'async';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { ExpandMoreRounded } from '@material-ui/icons';

import Drain from 'components/drain';
import { ProductCard } from 'components/cards';
import Action from './action';
import { CircularProgressButton } from 'components/buttons';

import { getItems, updateItem } from 'modules/items.reducer';

import styles from './styles';


class UserWarehouse extends Component {
  constructor() {
    super();

    this.state = {
      visible: false,
      selected: [],
      multipleChoice: false,
      isRestoring: false,
      isLoading: false,
    }
  }

  componentDidMount() {
    this.loadData(true);
  }

  loadData = (reset = false) => {
    let { items: { warehouse: { pagination: { limit, page } } } } = this.props;
    page = reset ? 0 : page + 1;
    const condition = { status: 'archived' }
    const { getItems } = this.props;
    return this.setState({ isLoading: true }, () => {
      return getItems(condition, limit, page, 'warehouse').then(() => {
        return this.setState({ isLoading: false });
      }).catch(console.error);
    });
  }

  onToggle = (e) => {
    return this.setState({ multipleChoice: e.target.checked });
  }

  onClick = (itemId) => {
    const { multipleChoice } = this.state;
    if (!multipleChoice) return null;
    return () => {
      let { selected } = this.state;
      let index = selected.indexOf(itemId);
      if (index === -1) selected.push(itemId);
      else if (index === selected.length - 1) selected.pop();
      else selected[index] = selected.pop();
      return this.setState({ selected });
    }
  }

  onRestore = () => {
    const { updateItem } = this.props;
    const { selected } = this.state;
    this.setState({ isRestoring: true });
    return async.eachSeries(selected, (itemId, cb) => {
      return updateItem({ _id: itemId, status: 'selling' }).then(re => {
        return cb();
      }).catch(er => {
        return cb(er);
      });
    }, (er) => {
      if (er) console.error(er);
      else this.loadData(true);
      return this.setState({ isRestoring: false });
    });
  }

  renderItems = () => {
    let { items: { warehouse: { data } } } = this.props;
    const { multipleChoice, selected } = this.state;
    if (!data || !data.length) return null;
    return <Grid container spacing={2}>
      {data.map(obj => <Grid key={obj._id} item xs={6} sm={4} md={3} lg={2}>
        <ProductCard
          itemId={obj._id}
          onClick={this.onClick(obj._id)}
          selective={multipleChoice}
          selected={selected.includes(obj._id)}
        />
      </Grid>)}
    </Grid>
  }

  render() {
    const { classes } = this.props;
    const { multipleChoice, isRestoring } = this.state;

    return <Grid container justify="center" spacing={2}>
      <Grid item xs={12}>
        <Grid container className={classes.noWrap} alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="h3">Nhà kho</Typography>
          </Grid>
          <Grid item className={classes.stretch}>
            <Divider />
          </Grid>
          <Grid item>
            <Typography>Chọn nhiều sản phẩm</Typography>
          </Grid>
          <Grid item>
            <Switch
              color="primary"
              checked={this.state.multipleChoice}
              onChange={this.onToggle}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {this.renderItems()}
      </Grid>
      <Grid item xs={12}>
        <Drain small />
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid item>
            <CircularProgressButton
              endIcon={<ExpandMoreRounded />}
              isLoading={this.state.isLoading}
              onClick={() => this.loadData(false)}
            >
              <Typography>Thêm</Typography>
            </CircularProgressButton>
          </Grid>
        </Grid>
      </Grid>
      {multipleChoice ? <Action isLoading={isRestoring} onRestore={this.onRestore} /> : null}
    </Grid>
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  items: state.items,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getItems, updateItem
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserWarehouse)));