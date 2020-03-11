import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import Drain from 'components/drain';
import Divider from 'components/divider';
import Card from 'components/card';
import Project from 'components/project';
import Gallery from 'components/gallery';
import Comment from 'components/comment';

import { getUserByCode } from 'modules/user.reducer';
import { getProjects } from 'modules/projects.reducer';

import styles from './styles';
import MENU from './menu';
import utils from 'helpers/utils';

class User extends Component {
  constructor() {
    super();

    this.state = {
      likes: '12.853',
      products: 32,
      userId: null,
      projects: []
    }
  }

  componentDidMount() {
    this.handleParams();
    window.addEventListener('scroll', this.onTheEnd);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onTheEnd);
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevProps.match) !== JSON.stringify(this.props.match))
      this.handleParams();
    if (prevState.userId !== this.state.userId)
      this.loadData();
  }

  handleParams = () => {
    let { match: { params: { userId } } } = this.props;
    this.setState({ userId });
  }

  onTheEnd = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight)
      return this.loadData();
  }

  loadData = () => {
    this.props.getProjects(this.state.userId).then(re => {
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
      return this.props.history.push(`/user/${this.state.userId}`);
    }
    this.setState({ goBack: true });
    return this.props.history.push(`/user/${this.state.userId}/${projectId}`);
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
    let author = project.user;
    let comments = project.comments;
    if (!author) return null;

    let dialogContent = <Fragment>
      <Grid item xs={12} md={10}>
        <Typography variant="h1">Nhận xét</Typography>
      </Grid>
      <Grid item xs={12} md={10}>
        <Comment user={this.props.auth} comments={comments} onSend={this.onComment} />
      </Grid>
    </Fragment>

    return <Gallery visible={true}
      project={project}
      author={author}
      onClose={this.onGallery}
      onBuy={() => this.onBuy(projectId)}
      onBookmark={() => this.onBookmark(projectId)}
      dialogContent={dialogContent} />
  }

  render() {
    let { classes } = this.props;
    let { auth } = this.props;
    let { projects } = this.state;

    if (!auth) return null;
    if (!projects || !projects.length) return null;

    return <Fragment>
      <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
        <Grid item xs={12}>
          <Drain />
        </Grid>
        <Grid item xs={10} md={5}>
          <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
            <Grid item>
              <Avatar alt={auth.displayname} src={auth.avatar} className={classes.avatar} />
            </Grid>
            <Grid item>
              <Typography variant="h1">{auth.displayname}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={10} md={5}>
          <Grid container direction="row" justify="flex-end" alignItems="center" spacing={2}>
            <Grid item>
              <Typography>{this.state.likes} Thích - {this.state.products} Sản phẩm</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Drain />
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row" justify="center" spacing={2}>
            {
              MENU.map(
                (card, i) => <Grid key={i} item xs={10} md={2}>
                  <Card {...card} width={this.props.ui.width} to={i === 0 ? '/factory' : '#'} />
                </Grid>
              )
            }
          </Grid>
        </Grid>
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
              projects.map(project => <Grid item key={utils.rand()} xs={12} sm={6} md={4}>
                {this.renderProject(auth, project)}
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
  users: state.users,
  projects: state.projects,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUserByCode,
  getProjects,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(User)));