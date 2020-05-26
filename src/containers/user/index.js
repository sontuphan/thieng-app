import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Parallax } from 'rc-scroll-anim';
import { loremIpsum } from 'lorem-ipsum';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import ToggleIcon from 'material-ui-toggle-icon';
import Tooltip from '@material-ui/core/Tooltip';

import {
  SettingsApplicationsRounded, CreateRounded,
  BorderColorRounded, ExitToAppRounded,
} from '@material-ui/icons';

import Drain from 'components/drain';
import { TextInput } from 'components/inputs';
import Menu from './menu';
import UserHome from './home';
import UserStore from './store';
import UserSettings from './settings';

import { logOut } from 'modules/auth.reducer';
import { getUserByCode } from 'modules/user.reducer';

import styles from './styles';
import PANEL from 'static/images/designer-2.jpg';
import utils from 'helpers/utils';


class User extends Component {
  constructor() {
    super();

    this.state = {
      likes: 12853,
      products: 32,
      editable: false,
    }
  }

  onEdit = () => {
    this.setState({ editable: !this.state.editable });
  }

  render() {
    let { classes } = this.props;

    return <Grid container justify="center" spacing={2}>

      <Grid item xs={12} className={classes.header}>
        <Grid container justify="flex-end" spacing={2}>
          <Grid item>
            <IconButton>
              <SettingsApplicationsRounded />
            </IconButton>
          </Grid>
        </Grid>
        <div className={classes.panel}>
          <div className={classes.frame}>
            <Parallax
              animation={{ scale: 1.5, playScale: [1, 2] }}
              style={{ transform: 'scale(1)' }}
            >
              <div className={classes.image}
                style={{
                  backgroundImage: `url('${PANEL}')`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'
                }} />
            </Parallax>
          </div>
        </div>
      </Grid>

      <Grid item xs={12} md={10}>
        <Paper elevation={0} className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2} className={classes.noWrap}>
                <Grid item>
                  <Avatar
                    alt={this.props.auth.displayname}
                    src={this.props.auth.avatar}
                    className={classes.avatar}
                  />
                </Grid>
                <Grid item className={classes.stretch}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Grid container alignItems="center" className={classes.noWrap} spacing={2}>
                        <Grid item className={classes.stretch}>
                          <Typography variant="body2">{this.props.auth.displayname}</Typography>
                        </Grid>
                        <Grid item>
                          <Tooltip title="Edit Your Description">
                            <IconButton onClick={this.onEdit} size="small">
                              <ToggleIcon
                                className={classes.toggleIcon}
                                on={this.state.editable}
                                onIcon={<BorderColorRounded fontSize="small" color="primary" />}
                                offIcon={<CreateRounded fontSize="small" />}
                              />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                        <Grid item>
                          <Tooltip title="Sign Out">
                            <IconButton onClick={this.props.logOut} size="small">
                              <ExitToAppRounded fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>{utils.prettyNumber(this.state.likes, 'long')} Thích - {utils.prettyNumber(this.state.products, 'long')} Sản phẩm</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextInput
                        value={loremIpsum({ units: 'paragraph' })}
                        readOnly={!this.state.editable}
                        focus={this.state.editable}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Drain small />
            </Grid>
            <Grid item xs={12}>
              <Menu />
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Drain small />
      </Grid>

      <Grid item xs={11} md={10}>
        <Switch>
          {/* <Route exact path="/user/:email/home" component={UserHome} /> */}
          <Route exact path="/user/:email/store" component={UserStore} />
          {/* <Route exact path="/user/:email/message" component={null} /> */}
          {/* <Route exact path="/user/:email/settings" component={UserSettings} /> */}
        </Switch>
      </Grid>

    </Grid>
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth,
  users: state.users,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  logOut,
  getUserByCode,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(User)));