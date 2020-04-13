import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Drain from 'components/drain';
import Selling from './selling';
import Processing from './processing';
import Archive from './archive';

import styles from './styles';

class Shop extends Component {
  constructor() {
    super();

    this.state = {

    }
  }


  render() {
    return <Grid container justify="center" alignItems="center" spacing={2}>
      <Grid item xs={12}>
        <Drain />
      </Grid>
      <Grid item xs={10}>
        <Selling />
      </Grid>
      <Grid item xs={10}>
        <Processing />
      </Grid>
      <Grid item xs={10}>
        <Archive />
      </Grid>
    </Grid>
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Shop)));