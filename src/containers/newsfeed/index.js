import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import { ShoppingCart, Share } from '@material-ui/icons';

import Drain from 'components/drain';
import Divider from 'components/divider';
import { StatusCard } from 'components/cards';
import Gallery from 'components/gallery';
import Comment from 'components/comment';
import { BottomDrawer } from 'components/drawers';

import { getProjects } from 'modules/projects.reducer';

import styles from './styles';
import utils from 'helpers/utils';

class Newsfeed extends Component {
  constructor() {
    super();

    this.state = {
      projects: [],
      projectId: null,
      visibleGallery: false,
    }
  }

  componentDidMount() {
    this.loadData();
    window.addEventListener('scroll', this.onTheEnd);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onTheEnd);
  }

  onTheEnd = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight)
      return this.loadData();
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
    this.setState({ projectId: Number(projectId), visibleGallery: true });
  }

  onComment = (comment) => {
    console.log(comment);
  }

  onBuy = () => {
    this.props.history.push(`/mall/${this.state.projectId}`);
  }

  onBookmark = () => {
    console.log(this.state.projectId)
  }

  renderProject = (auth, project) => {
    if (!project.comments) return null;

    let commentSession = <Grid item xs={12}>
      <Comment user={this.props.auth} comments={project.comments} onSend={this.onComment} dense />
    </Grid>

    return <StatusCard
      author={auth}
      project={project}
      onClick={() => this.onGallery(`${project.id}`)}
      commentSession={commentSession} />
  }

  renderFullStatus = () => {
    if (typeof this.state.projectId !== 'number') return null;
    let project = this.state.projects[this.state.projectId];
    let comments = project.comments;

    return <BottomDrawer
      visible={this.state.visibleGallery}
      onClose={() => this.setState({ visibleGallery: false })}
    >
      <Grid container spacing={2} justify="center">
        <Grid item xs={12} md={10} lg={8}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Avatar alt={this.props.auth.displayname} src={this.props.auth.avatar} />
                </Grid>
                <Grid item xs={8}>
                  <Typography noWrap>{this.props.auth.displayname}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container justify="flex-end" spacing={2}>
                <Grid item>
                  <IconButton color="secondary" size="small" onClick={this.onBuy}>
                    <ShoppingCart />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton color="secondary" size="small" onClick={this.onBookmark}>
                    <Share />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={10} lg={8}>
          <Gallery project={project} />
        </Grid>
        <Grid item xs={12} md={10} lg={8}>
          <Drain />
        </Grid>
        <Grid item xs={12} md={10} lg={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={10}>
              <Typography variant="h1">Nhận xét</Typography>
            </Grid>
            <Drain small />
            <Grid item xs={12} md={10}>
              <Comment user={this.props.auth} comments={comments} onSend={this.onComment} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </BottomDrawer >
  }

  render() {
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
              projects.map(project => <Grid key={utils.rand()} item xs={12} sm={6} md={4} xl={3}>
                {this.renderProject(this.props.auth, project)}
              </Grid>)
            }
          </Grid>
        </Grid>
      </Grid>
      {this.renderFullStatus()}
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