import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import { Menu } from '@material-ui/icons';

import styles from './styles';

class Header extends Component {
  constructor() {
    super()

    this.state = {
      matches: window.innerWidth >= 960
    }
  }

  componentDidMount() {
    // md : min-width 960px
    window.onresize = () => {
      this.setState({ matches: window.innerWidth >= 960 })
    }
  }

  render() {
    let { classes } = this.props;
    return <Fragment>
      <Grid item xs={10}>
        <Grid container
          direction="row"
          alignItems="center">
          <Grid item xs={4}>
            <Typography variant="h3">Thiêng</Typography>
          </Grid>
          <Grid item xs={8}>
            {this.state.matches ? <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
              spacing={2}>
              <Grid item>
                <Typography className={classes.route}><span className="link">Thiết kế</span></Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.route}><span className="link">Mua sắm</span></Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.route}><span className="link">Liên hệ</span></Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.route}><span className="link">Đăng nhập</span></Typography>
              </Grid>
            </Grid>
              : <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center">
                <IconButton color="secondary">
                  <Menu />
                </IconButton>
              </Grid>
            }
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Header)));