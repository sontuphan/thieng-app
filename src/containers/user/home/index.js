import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { AddBoxRounded, WarningRounded, } from '@material-ui/icons';

import Status from 'containers/status';
import Editor from './editor';

import { getProjects } from 'modules/projects.reducer';
import { checkTreeRootInLocalStorage } from 'components/blueprint/tree/history';

import styles from './styles';


class UserHome extends Component {
  constructor() {
    super();

    this.state = {
      visible: false,
      projects: [],
    }
  }

  componentDidMount() {
    let { projects: { pagination: { limit, page } } } = this.props;
    this.props.getProjects(limit, page + 1);
    window.addEventListener('scroll', this.onTheEnd);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onTheEnd);
  }

  onTheEnd = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      let { projects: { pagination: { limit, page } } } = this.props;
      this.props.getProjects(limit, page + 1);
    }
  }

  render() {
    let { classes } = this.props;
    let { projects: { data } } = this.props;

    return <Grid container justify="center" spacing={2}>

      <Grid item xs={12}>
        <Grid container className={classes.noWrap} alignItems="center" justify="flex-end" spacing={2}>
          <Grid item>
            <Typography variant="h3">Home</Typography>
          </Grid>
          <Grid item className={classes.stretch}>
            <Divider />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              startIcon={checkTreeRootInLocalStorage() ? <WarningRounded /> : <AddBoxRounded />}
              onClick={() => this.setState({ visible: true })}
            >
              <Typography>{checkTreeRootInLocalStorage() ? 'Resume' : 'New'}</Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Editor
          visible={this.state.visible}
          onClose={() => this.setState({ visible: false })}
        />
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={2}>
          {
            data.map(blueprint => <Grid item key={blueprint._id} xs={12} sm={6} md={4} lg={3} xl={2}>
              <Status _id={blueprint._id} />
            </Grid>)
          }
        </Grid>
      </Grid>

    </Grid>
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth,
  projects: state.projects,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getProjects,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserHome)));