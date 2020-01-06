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
      <Grid item xs={10} className={classes.row}>
        <Grid container className={classes.maxHeight}>
          <Grid item xs={6}>
            <Grid container alignItems="center" className={classes.maxHeight}>
              <Typography variant="h3" className={classes.link}>Thiêng</Typography>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            {this.state.matches ? <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
              className={classes.maxHeight}>
              <Typography className={classes.link}><span className="link">Thiết kế</span></Typography>
              <Typography className={classes.link}><span className="link">Mua sắm</span></Typography>
              <Typography className={classes.link}><span className="link">Liên hệ</span></Typography>
              <Typography className={classes.link}><span className="link">Đăng nhập</span></Typography>
            </Grid>
              : <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
                className={classes.maxHeight}>
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