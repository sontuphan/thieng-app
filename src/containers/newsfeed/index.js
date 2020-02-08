import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Drain from 'components/drain';
import Divider from 'components/divider';
import Project from 'components/project';

import utils from 'helpers/utils';
import { getProjects } from 'modules/projects.reducer';

import styles from './styles';

class Newsfeed extends Component {
  constructor() {
    super();

    this.state = {
      projects: []
    }
    
    utils.onTheEnd(this.loadData);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.props.getProjects().then(re => {
      let newData = this.state.projects.concat(re.data);
      return this.setState({ projects: newData });
    }).catch(er => {
      return console.error(er);
    });
  }

  render() {
    // let { classes } = this.props;
    let { projects } = this.state;

    if (!projects) return null;

    return <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
      <Grid item xs={12}>
        <Drain />
      </Grid>
      <Grid item xs={10}>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1">Bảng tin</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Drain small />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={10} md={10}>
        <Grid container direction="row" spacing={2}>
          {
            projects.map((project, index) => {
              if (!project.user || !project.comments) return null;
              return <Grid key={index} item xs={12} sm={6} md={4}>
                <Project
                  author={project.user}
                  project={project}
                  comments={project.comments}
                  auth={this.props.auth} />
              </Grid>
            })
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
)(withStyles(styles)(Newsfeed)));