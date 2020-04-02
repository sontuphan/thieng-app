import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Drain from 'components/drain';
import Divider from 'components/divider';
import Project from 'components/project';
import BottomDrawer from 'components/drawers';
import Comment from 'components/comment';

import { getProjects } from 'modules/projects.reducer';

import styles from './styles';
import utils from 'helpers/utils';

class Newsfeed extends Component {
  constructor() {
    super();

    this.state = {
      goBack: false,
      projects: []
    }
  }

  onTheEnd = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight)
      return this.loadData();
  }

  componentDidMount() {
    this.loadData();
    window.addEventListener('scroll', this.onTheEnd);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onTheEnd);
  }

  loadData = () => {
    this.props.getProjects().then(re => {
      let newData = this.state.projects.concat(re.data);
      return this.setState({ projects: newData });
    }).catch(er => {
      return console.error(er);
    });
  }

  onGallery = (projectId) => {
    if (typeof projectId !== 'string') {
      if (this.state.goBack)
        return this.props.history.goBack();
      return this.props.history.push('/newsfeed');
    }
    this.setState({ goBack: true });
    return this.props.history.push('/newsfeed/' + projectId);
  }

  onComment = (comment) => {
    console.log(comment);
  }

  onBuy = (projectId) => {
    this.props.history.push(`/mall/${projectId}`);
  }

  onBookmark = (projectId) => {
    console.log(projectId)
  }

  renderProject = (auth, project) => {
    if (!project.comments) return null;

    let commentSession = <Grid item xs={12}>
      <Comment user={this.props.auth} comments={project.comments} onSend={this.onComment} dense />
    </Grid>

    return <Project
      author={auth}
      project={project}
      onClick={() => this.onGallery(`${project.id}`)}
      commentSession={commentSession} />
  }

  renderGallery = () => {
    let { projectId } = this.props.match.params;
    if (!projectId) return null;

    let project = this.state.projects[Number(projectId)];
    let comments = project.comments;

    let dialogContent = <Fragment>
      <Grid item xs={12} md={10}>
        <Typography variant="h1">Nhận xét</Typography>
      </Grid>
      <Grid item xs={12} md={10}>
        <Comment user={this.props.auth} comments={comments} onSend={this.onComment} />
      </Grid>
    </Fragment>

    return <BottomDrawer visible={true}
      project={project}
      author={this.props.auth}
      onClose={this.onGallery}
      onBuy={() => this.onBuy(projectId)}
      onBookmark={() => this.onBookmark(projectId)}
      dialogContent={dialogContent} />
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
              projects.map(project => <Grid key={utils.rand()} item xs={12} sm={6} lg={3}>
                {this.renderProject(this.props.auth, project)}
              </Grid>)
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