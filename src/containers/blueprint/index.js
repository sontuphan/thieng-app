import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { VisibilityRounded } from '@material-ui/icons';

import Drain from 'components/drain';
import Render from './render';

import styles from './components/styles';


class Blueprint extends Component {
  constructor() {
    super();

    this.state = {
      editable: true
    }
  }

  onPreview = () => {
    this.setState({ editable: !this.state.editable });
  }

  render() {
    return <Grid container justify="center" spacing={2}>
      <Grid item xs={12}>
        <Drain />
      </Grid>
      <Grid item xs={12} md={10}>
        <Grid container justify="flex-end">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={this.onPreview}
              startIcon={<VisibilityRounded />}
            >
              <Typography>Preview</Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={10}>
        <Render editable={this.state.editable} />
      </Grid>
    </Grid>
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Blueprint)));