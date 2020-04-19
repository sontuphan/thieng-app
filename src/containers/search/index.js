import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import { } from '@material-ui/icons';

import { TopDrawer } from 'components/drawers';
import Drain from 'components/drain';
import SearchToolbar from './toolbar';

import { toogleSearch, searchText } from 'modules/search.reducer';

import styles from './styles';


class Search extends Component {

  onChange = (value) => {
    this.props.searchText(value);
  }

  render() {
    let { classes } = this.props;

    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <TopDrawer
          visible={this.props.search.visible}
          onClose={this.props.toogleSearch}
        >
          <Grid container spacing={2} justify="center">

            <Grid item xs={12}>
              <Drain small />
            </Grid>

            <Grid item xs={11} md={10}>
              <Grid
                container
                alignItems="center"
                className={classes.noWrap}
                spacing={2}
              >
                <Grid item>
                  <Typography variant="h3">Search Center</Typography>
                </Grid>
                <Grid item className={classes.stretch} xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={6}>
                  <SearchToolbar onChange={this.onChange} fullWidth />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Drain small />
            </Grid>

            <Grid item xs={11} md={10}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  {/* Components */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </TopDrawer>
      </Grid>
    </Grid>
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth,
  search: state.search,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toogleSearch, searchText,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Search)));