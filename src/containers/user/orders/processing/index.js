import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

import { SearchRounded } from '@material-ui/icons';

import Row, { Header } from '../row';
import Order from '../order';

import { getOrders } from 'modules/order.reducer';

import styles from './styles';

const DEFAULT_CONDITION = { status: { $ne: { $and: ['canceled', 'done'] } } }

class ProcesingOrders extends Component {
  constructor() {
    super();

    this.state = {
      visible: false,
      orderId: null,
      condition: { ...DEFAULT_CONDITION }
    }
  }

  componentDidMount() {
    const { order: { pagination: { limit } } } = this.props;
    this.loadData(limit, 0);
  }

  loadData = (limit, page) => {
    const { getOrders } = this.props;
    const { condition } = this.state;
    return getOrders(condition, limit, page);
  }

  onChangePage = (e, page) => {
    const { order: { pagination: { limit } } } = this.props;
    return this.loadData(limit, page);
  }

  onChangeRowsPerPage = (e) => {
    const limit = e.target.value;
    return this.loadData(limit, 0);
  }

  onOpenOrder = (orderId) => {
    return this.setState({ visible: true, orderId });
  }

  onCloseOrder = () => {
    return this.setState({ visible: false, orderId: null });
  }

  onSearch = () => {
    console.log(this.state.condition)
    return this.loadData(5, 0);
  }

  onChangeCondition = (e) => {
    return this.setState({ condition: { ...this.state.condition, _id: e.target.value } });
  }

  render() {
    const { classes } = this.props;
    const { order: { data, pagination } } = this.props;

    return <Grid container spacing={2}>
      <Grid item xs={12} >
        <TextField
          variant="outlined"
          color="secondary"
          placeholder="Mã đơn hàng"
          size="small"
          onChange={this.onChangeCondition}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start" className={classes.adornment}>
                <IconButton size="small" onClick={this.onSearch}>
                  <SearchRounded />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onKeyPress={e => e.key === 'Enter' && this.onSearch}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Slide direction="right" in={!this.state.visible} mountOnEnter unmountOnExit>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <Header />
              </TableHead>
              <TableBody>
                {data.map((order, i) => <Row
                  key={i}
                  orderId={order._id}
                  onClick={() => this.onOpenOrder(order._id)}
                />)}
              </TableBody>
            </Table>
          </TableContainer>
        </Slide>
        <Slide direction="right" in={!this.state.visible} mountOnEnter unmountOnExit>
          <TablePagination
            labelRowsPerPage="Số dòng:"
            rowsPerPageOptions={[5, 10, 15, 20]}
            component="div"
            count={-1}
            labelDisplayedRows={({ page }) => `Trang ${page + 1}`}
            rowsPerPage={pagination.limit}
            page={pagination.page}
            onChangePage={this.onChangePage}
            onChangeRowsPerPage={this.onChangeRowsPerPage}
          />
        </Slide>
        <Order
          visible={this.state.visible}
          orderId={this.state.orderId}
          onClose={this.onCloseOrder}
        />
      </Grid>
    </Grid>
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  order: state.order,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getOrders,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ProcesingOrders)));