import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link as RouterLink, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {
  HomeRounded, ChatRounded, StorefrontRounded,
} from '@material-ui/icons';

import styles from './styles';


const MENU = {
  home: { name: 'Trang chủ', value: 'home', icon: <HomeRounded />, disabled: true },
  store: { name: 'Cửa hàng', value: 'store', icon: <StorefrontRounded />, disabled: false },
  message: { name: 'Tin nhắn', value: 'message', icon: <ChatRounded />, disabled: true },
}

class Menu extends Component {

  renderButton = ({ name, value, icon, disabled }) => {
    const { match: { params: { userId, page } } } = this.props;
    return <Grid item>
      <Button
        variant="outlined"
        color={page === value ? 'primary' : 'default'}
        startIcon={icon}
        component={RouterLink}
        to={`/guest/${userId}/${value}`}
        disabled={disabled}
      >
        <Typography>{name}</Typography>
      </Button>
    </Grid>
  }

  render() {
    return <Grid container spacing={2} justify="center">
      {this.renderButton(MENU.home)}
      {this.renderButton(MENU.store)}
      {this.renderButton(MENU.message)}
    </Grid>
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Menu)));