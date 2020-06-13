import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import Drain from 'components/drain';
import Status from 'containers/status';
import Menu from './menu';

import { getProjects } from 'modules/projects.reducer';

import styles from './styles';
import utils from 'helpers/utils';

class Newsfeed extends Component {
  constructor() {
    super();

    this.state = {
      projects: [],
      page: 'for-me'
    }
  }

  componentDidMount() {
    this.loadData();
    this.readParams();
    window.addEventListener('scroll', this.onTheEnd);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onTheEnd);
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.match.params) !== JSON.stringify(this.props.match.params))
      this.readParams();
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

  readParams = () => {
    let { match: { params: { page } } } = this.props;
    this.setState({ page });
  }

  render() {
    let { classes } = this.props;
    let { projects } = this.state;
    if (!projects || !projects.length) return null;

    return <Grid container justify="center" spacing={2}>
      <Grid item xs={12}>
        <Drain large />
      </Grid>

      <Grid item xs={11} md={10}>
        <Menu />
      </Grid>

      <Grid item xs={12}>
        <Drain small />
      </Grid>
      <Grid item xs={11} md={10}>
        <Grid container className={classes.noWrap} alignItems="center" justify="flex-end" spacing={2}>
          <Grid item>
            <Typography variant="h3">{utils.paramToHeader(this.state.page)}</Typography>
          </Grid>
          <Grid item className={classes.stretch}>
            <Divider />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Drain small />
      </Grid>

      <Grid item xs={11} md={10}>
        <Grid container spacing={2}>
          {
            projects.map((project, i) => <Grid key={i} item xs={12} sm={6} md={4} lg={3} xl={2}>
              <Status project={project} />
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
)(withStyles(styles)(Newsfeed)));