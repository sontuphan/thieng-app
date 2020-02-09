import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import { Close } from '@material-ui/icons';

import Drain from 'components/drain';
import Divider from 'components/divider';
import Project from 'components/project';
import Gallery from 'components/gallery';

import utils from 'helpers/utils';
import { getProjects } from 'modules/projects.reducer';

import styles from './styles';

class Newsfeed extends Component {
  constructor() {
    super();

    this.state = {
      projects: []
    }
  }

  componentDidMount() {
    this.loadData();
    utils.onTheEnd(this.loadData);
  }

  loadData = () => {
    this.props.getProjects().then(re => {
      let newData = this.state.projects.concat(re.data);
      return this.setState({ projects: newData });
    }).catch(er => {
      return console.error(er);
    });
  }

  onToogleGallery = (projectId) => {
    if (typeof projectId !== 'string')
      return this.props.history.push('/newsfeed');
    return this.props.history.push('/newsfeed/' + projectId);
  }

  renderGallery = () => {
    let { projectId } = this.props.match.params;
    if (!projectId) return null;

    let project = this.state.projects[Number(projectId)];
    let author = project.user;

    if (!author) return null;

    return <Dialog
      open={true}
      onClose={console.log}
      fullScreen={true}
    >
      <DialogTitle>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Avatar alt={author.displayname} src={author.avatar} />
              </Grid>
              <Grid item>
                <Typography variant="h3">{author.displayname}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container justify="flex-end" spacing={2}>
              <Grid item>
                <IconButton color="secondary" size="small" onClick={this.onToogleGallery}>
                  <Close />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Gallery project={project} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  }

  render() {
    // let { classes } = this.props;
    let { projects } = this.state;

    if (!projects || !projects.length) return null;

    return <Fragment>
      <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
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
                    auth={this.props.auth}
                    onClick={() => this.onToogleGallery(`${project.id}`)}
                    onSend={console.log} />
                </Grid>
              })
            }
          </Grid>
        </Grid>
      </Grid>
      {this.renderGallery()}
    </Fragment>
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