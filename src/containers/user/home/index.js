import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';

import {
  AddBoxRounded, WarningRounded, SaveAltRounded,
  PublicRounded, ExpandMoreRounded,
} from '@material-ui/icons';

import Status from 'containers/status';
import Blueprint from 'components/blueprint';
import { BottomDrawer } from 'components/drawers';
import Drain from 'components/drain';

import { getProjects } from 'modules/projects.reducer';

import styles from './styles';
import utils from 'helpers/utils';
import { checkTreeRootInLocalStorage } from 'components/blueprint/tree/history';

const MAX_LENGTH_STATUS = 250;

class UserHome extends Component {
  constructor() {
    super();

    this.state = {
      visible: true,
      status: '',
      blueprint: {},
      projects: [],
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
    let { match: { params: { userId } } } = this.props;
    this.props.getProjects(userId).then(re => {
      let newData = this.state.projects.concat(re.data);
      return this.setState({ projects: newData });
    }).catch(er => {
      return console.error(er);
    });
  }

  onVisibleBlueprint = () => {
    this.setState({ visible: true });
  }

  onBluePrint = (value) => {
    this.setState({ blueprint: value });
  }

  onStatus = (e) => {
    let value = e.target.value;
    if (!value) value = '';
    if (value.length > MAX_LENGTH_STATUS) return;
    this.setState({ status: value });
  }

  render() {
    let { classes } = this.props;
    let { projects } = this.state;
    if (!projects || !projects.length) return null;

    return <Grid container spacing={2}>

      <Grid item xs={12}>
        <Grid container justify="flex-end" spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              className={classes.fixAlign}
              startIcon={checkTreeRootInLocalStorage() ? <WarningRounded /> : <AddBoxRounded />}
              onClick={this.onVisibleBlueprint}
            >
              <Typography>{checkTreeRootInLocalStorage() ? 'Resume' : 'New'}</Typography>
            </Button>
          </Grid>
          <BottomDrawer
            visible={this.state.visible}
            onClose={() => this.setState({ visible: false })}
          >
            <Grid container spacing={2} justify="center">
              <Grid item xs={12} md={11} lg={10}>
                <Grid container spacing={this.props.ui.width >= 960 ? 4 : 2}>

                  <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Blueprint onChange={this.onBluePrint} />
                      </Grid>
                      <Grid item xs={12}>
                        <Drain />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Grid container spacing={2} justify="center">

                      <Grid item xs={10} md={12}>
                        <Grid container justify="space-between" alignItems="center" spacing={2}>
                          <Grid item>
                            <Grid container className={classes.noWrap} alignItems="center" spacing={2}>
                              <Grid item>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  startIcon={<PublicRounded fontSize="small" />}
                                  onClick={this.onPublish}
                                  size="small"
                                >
                                  <Typography noWrap>Publish</Typography>
                                </Button>
                              </Grid>
                              <Grid item>
                                <Button
                                  variant="outlined"
                                  startIcon={<SaveAltRounded fontSize="small" />}
                                  onClick={() => this.setState({ visible: false })}
                                  size="small"
                                >
                                  <Typography noWrap>Save</Typography>
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <IconButton size="small">
                              <ExpandMoreRounded fontSize="small" />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={10} md={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={10} md={12}>
                        <Grid container justify="space-between" alignItems="center" spacing={2}>
                          <Grid item>
                            <Grid container className={classes.noWrap} alignItems="center" spacing={2}>
                              <Grid item>
                                <Avatar
                                  alt={this.props.auth.displayname}
                                  src={this.props.auth.avatar}
                                  className={classes.avatar}
                                />
                              </Grid>
                              <Grid item>
                                <Typography>{this.props.auth.displayname}</Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Typography>{this.state.status.length}/{MAX_LENGTH_STATUS}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={10} md={12}>
                        <TextField
                          label="Short introduction about your work of art."
                          variant="outlined"
                          size="small"
                          color="secondary"
                          value={this.state.status}
                          onChange={this.onStatus}
                          InputProps={{ classes: { input: classes.font } }}
                          multiline
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={10} md={12}>
                        <Divider />
                      </Grid>
                    </Grid>
                  </Grid>

                </Grid>
              </Grid>
            </Grid>
          </BottomDrawer>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={2}>
          {
            projects.map(project => <Grid item key={utils.rand()} xs={12} sm={6} md={4} lg={3} xl={2}>
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
)(withStyles(styles)(UserHome)));