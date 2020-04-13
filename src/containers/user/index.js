import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Parallax } from 'rc-scroll-anim';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';

import {
  SettingsApplicationsRounded, SettingsRounded,
  ChatRounded, StorefrontRounded, AddBoxRounded,
  AccountBalanceWalletRounded
} from '@material-ui/icons';

import Status from 'containers/status';
import Drain from 'components/drain';

import { getUserByCode } from 'modules/user.reducer';
import { getProjects } from 'modules/projects.reducer';

import styles from './styles';
import utils from 'helpers/utils';
import PANEL from 'static/images/designer-2.jpg';

class User extends Component {
  constructor() {
    super();

    this.state = {
      likes: 12853,
      products: 32,
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

  render() {
    let { classes } = this.props;
    let { projects } = this.state;
    if (!projects || !projects.length) return null;

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

      <Grid item xs={12} md={10} className={classes.body}>
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={2} className={classes.subheader}>
              <Grid item xs={12} sm={6}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <Avatar
                      alt={this.props.auth.displayname}
                      src={this.props.auth.avatar}
                      className={classes.avatar}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">{this.props.auth.displayname}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid container justify="flex-end" alignItems="center" spacing={2}>
                  <Grid item>
                    <Typography>{utils.prettyNumber(this.state.likes, 'long')} Thích - {utils.prettyNumber(this.state.products, 'long')} Sản phẩm</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2} className={classes.subheader} justify="flex-end">
              <Grid item>
                <Badge badgeContent={1} color="primary">
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<AddBoxRounded />}
                    href="/blueprint"
                  >
                    <Typography>New Blueprint</Typography>
                  </Button>
                </Badge>
              </Grid>
              <Grid item>
                <Badge badgeContent={4} color="primary">
                  <Button
                    variant="outlined"
                    startIcon={<StorefrontRounded />}
                    href="#"
                  >
                    <Typography>My Store</Typography>
                  </Button>
                </Badge>
              </Grid>
              <Grid item>
                <Badge badgeContent={18} color="primary">
                  <Button
                    variant="outlined"
                    startIcon={<ChatRounded />}
                    href="#"
                  >
                    <Typography>Message</Typography>
                  </Button>
                </Badge>
              </Grid>
              <Grid item>
                <Badge badgeContent={0} color="primary">
                  <Button
                    variant="outlined"
                    startIcon={<AccountBalanceWalletRounded />}
                    href="#"
                    disabled
                  >
                    <Typography>Wallet</Typography>
                  </Button>
                </Badge>
              </Grid>
              <Grid item>
                <Badge badgeContent={0} color="primary">
                  <Button
                    variant="outlined"
                    href="/settings"
                    startIcon={<SettingsRounded />}
                  >
                    <Typography>Settings</Typography>
                  </Button>
                </Badge>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Drain small />
          </Grid>

          <Grid item xs={12}>
            <Grid container direction="row" spacing={2}>
              {
                projects.map(project => <Grid item key={utils.rand()} xs={12} sm={6} md={4} lg={3} xl={2}>
                  <Status project={project} />
                </Grid>)
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>

    </Grid>
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