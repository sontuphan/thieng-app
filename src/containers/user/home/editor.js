import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';

import { SaveAltRounded, PublicRounded, ExpandMoreRounded } from '@material-ui/icons';

import Blueprint from 'components/blueprint';
import { BottomDrawer } from 'components/drawers';
import Drain from 'components/drain';
import Cascade from 'components/blueprint/cascade';

import { addProject } from 'modules/projects.reducer';

import styles from './styles';

const MAX_LENGTH_STATUS = 150;


class Editor extends Component {
  constructor() {
    super();

    this.state = {
      status: '',
      blueprint: {},
    }
  }

  loadData = () => {
    let { match: { params: { email } } } = this.props;
    this.props.getProjects(email).then(re => {
      let newData = this.state.projects.concat(re.data);
      return this.setState({ projects: newData });
    }).catch(er => {
      return console.error(er);
    });
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

  onPublish = () => {
    const data = {
      content: this.state.status,
      tree: this.state.blueprint,
    }
    console.log(data);
    // return this.props.addProject(data).then(re => {
    //   console.log(re);
    // }).catch(er => {
    //   console.error(er);
    // });
  }

  render() {
    let { classes } = this.props;

    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <BottomDrawer
          visible={this.props.visible}
          onClose={this.props.onClose}
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
                                onClick={this.props.onClose}
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
                        multiline
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={10} md={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={10} md={12}>
                      <Cascade root={this.state.blueprint} />
                    </Grid>
                    <Grid item xs={12}>
                      <Drain />
                    </Grid>
                  </Grid>
                </Grid>

              </Grid>
            </Grid>
          </Grid>
        </BottomDrawer>
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
  addProject
}, dispatch);

Editor.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Editor)));