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

import { ProductCard } from 'components/cards';
import Action from './action';

import { getItems, updateItem } from 'modules/items.reducer';

import styles from './styles';


class UserStore extends Component {
  constructor() {
    super();

    this.state = {
      visible: false,
      selected: [],
      multipleChoice: false,
      isLoading: false,
    }
  }

  componentDidMount() {
    this.loadData(true);
  }

  loadData = (reset = false) => {
    let { items: { store: { pagination: { limit, page } } } } = this.props;
    page = reset ? 0 : page + 1;
    const { getItems } = this.props;
    const condition = { status: 'selling' }
    return getItems(condition, limit, page, 'store');
  }

  onToggle = (e) => {
    return this.setState({ multipleChoice: e.target.checked });
  }

  onClick = (itemId) => {
    const { multipleChoice } = this.state;
    if (multipleChoice) {
      return () => {
        let { selected } = this.state;
        let index = selected.indexOf(itemId);
        if (index === -1) selected.push(itemId);
        else if (index === selected.length - 1) selected.pop();
        else selected[index] = selected.pop();
        return this.setState({ selected });
      }
    }
    return null;
  }

  onDelete = () => {
    const { updateItem } = this.props;
    const { selected } = this.state;
    this.setState({ isLoading: true });
    return async.eachSeries(selected, (itemId, cb) => {
      return updateItem({ _id: itemId, status: 'archived' }).then(re => {
        return cb();
      }).catch(er => {
        return cb(er);
      });
    }, (er) => {
      if (er) console.error(er);
      else this.loadData(true);
      return this.setState({ isLoading: false });
    });
  }

  renderItems = () => {
    const { items: { store: { data } } } = this.props;
    const { multipleChoice, selected } = this.state;
    if (!data || !data.length) return null;
    return <Grid container spacing={2}>
      {data.map((obj, i) => <Grid key={i} item xs={6} sm={4} md={3} lg={2}>
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
    const { multipleChoice, isLoading } = this.state;

    return <Grid container justify="center" spacing={2}>
      <Grid item xs={12}>
        <Grid container className={classes.noWrap} alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="h3">Cửa hàng</Typography>
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
      {multipleChoice ? <Action isLoading={isLoading} onDelete={this.onDelete} /> : null}
    </Grid>
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  items: state.items,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getItems, updateItem,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserStore)));