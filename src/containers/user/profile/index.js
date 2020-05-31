import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import isEqual from 'react-fast-compare';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ToggleIcon from 'material-ui-toggle-icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import {
  CreateRounded, BorderColorRounded, ExitToAppRounded,
} from '@material-ui/icons';

import { TextInput } from 'components/inputs';

import { logOut } from 'modules/auth.reducer';
import { getUser } from 'modules/bucket.reducer';
import { updateUser } from 'modules/user.reducer';

import styles from './styles';
import utils from 'helpers/utils';


class Profile extends Component {
  constructor() {
    super();

    this.state = {
      likes: 12853,
      products: 32,
      editable: false,
      user: {},
    }
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { userId } = this.props;
    if (!isEqual(prevProps.userId, userId)) {
      this.loadData();
    }
  }

  loadData = () => {
    const { userId, getUser } = this.props;
    return getUser(userId).then(user => {
      return this.setState({ user });
    }).catch(console.error);
  }

  onEdit = () => {
    const { editable, user } = this.state;
    if (editable) this.props.updateUser(user).then(user => {
      this.setState({ user });
    }).catch(console.error);
    return this.setState({ editable: !editable });
  }

  onChange = (value) => {
    const { user } = this.state;
    return this.setState({ user: { ...user, description: value } });
  }

  render() {
    const { classes } = this.props;
    const { user } = this.state;

    return <Grid container spacing={1}>
      <Grid item xs={12}>
        <Grid container spacing={2} className={classes.noWrap}>
          <Grid item>
            <Avatar
              alt={user.displayname}
              src={user.avatar}
              className={classes.avatar}
            />
          </Grid>
          <Grid item className={classes.stretch}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Grid container alignItems="center" className={classes.noWrap} spacing={2}>
                  <Grid item className={classes.stretch}>
                    <Typography variant="body2">{user.displayname}</Typography>
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
                  value={user.description}
                  readOnly={!this.state.editable}
                  focus={this.state.editable}
                  onChange={this.onChange}
                  placeholder='Giới thiệu đôi nét về bản thân nào! 😊'
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  }
}

Profile.defaultProps = {

}

Profile.propTypes = {
  userId: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  logOut,
  getUser,
  updateUser,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Profile)));