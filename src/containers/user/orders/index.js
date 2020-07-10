import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Switch from '@material-ui/core/Switch';

import {
  ScheduleRounded, UnarchiveRounded, FlightRounded,
  BlockRounded, ThumbUpAltRounded, SettingsRounded
} from '@material-ui/icons';

import Drain from 'components/drain';
import DataTable from './table';

import styles from './styles';
import utils from 'helpers/utils';


const DEFAULT_STATUS = ['waiting', 'packaging', 'delivering', 'canceled', 'done'];
const DEFAULT_ICONS = [<ScheduleRounded />, <UnarchiveRounded />, <FlightRounded />, <BlockRounded />, <ThumbUpAltRounded />]

class UserOrders extends Component {
  constructor() {
    super();

    this.state = {
      anchorEl: null,
      status: [...DEFAULT_STATUS],
    }
  }

  onOpen = (e) => {
    return this.setState({ anchorEl: e.currentTarget });
  }

  onClose = () => {
    return this.setState({ anchorEl: null });
  }

  onChange = (e) => {
    const checked = e.target.checked;
    const value = e.target.name;
    let status = this.state.status;
    if (status.length > 1) status = status.filter(e => e !== value);
    if (checked) status.push(value);
    return this.setState({ status });
  }

  renderSwitches = () => {
    const { classes } = this.props;
    return DEFAULT_STATUS.map((status, i) => <Grid item key={i} xs={12}>
      <Grid container spacing={2} alignItems="center" className={classes.noWrap}>
        <Grid item>
          {DEFAULT_ICONS[i]}
        </Grid>
        <Grid item className={classes.stretch}>
          <Typography>{utils.translateOrderStatus(status)}</Typography>
        </Grid>
        <Grid item>
          <Switch
            checked={this.state.status.includes(status)}
            onChange={this.onChange}
            name={status}
            color="primary"
          />
        </Grid>
      </Grid>
    </Grid>)
  }

  render() {
    const { classes } = this.props;
    return <Grid container justify="center" spacing={2}>
      <Grid item xs={12}>
        <Grid container className={classes.noWrap} alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="h3">Đơn hàng</Typography>
          </Grid>
          <Grid item className={classes.stretch}>
            <Divider />
          </Grid>
          <Grid item>
            <IconButton size="small" onClick={this.onOpen}>
              <SettingsRounded fontSize="small" />
            </IconButton>
            <Popover
              anchorEl={this.state.anchorEl}
              open={Boolean(this.state.anchorEl)}
              onClose={this.onClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}
              PaperProps={{ className: classes.popover }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h3">Bộ lọc</Typography>
                </Grid>
                {this.renderSwitches()}
              </Grid>
            </Popover>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Drain small />
      </Grid>
      <Grid item xs={12}>
        <DataTable status={this.state.status} />
      </Grid>
    </Grid>
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserOrders)));