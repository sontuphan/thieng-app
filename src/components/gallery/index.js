import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import { ShoppingCart, Share } from '@material-ui/icons';

import styles from './styles';
import { BottomDrawer } from 'components/drawers';
import Item from './item';
import Drain from 'components/drain';

class Gallery extends Component {

  render() {
    // let { classes } = this.props;

    return <BottomDrawer
      visible={this.props.visible}
      onOpen={this.props.onOpen}
      onClose={this.props.onClose}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item project={this.props.project} />
        </Grid>
        <Grid item xs={12}>
          <Drain />
        </Grid>
        <Grid item xs={12} >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Avatar alt={this.props.author.displayname} src={this.props.author.avatar} />
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h3" noWrap>{this.props.author.displayname}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container justify="flex-end" spacing={2}>
                <Grid item>
                  <IconButton color="secondary" size="small" onClick={this.props.onBuy}>
                    <ShoppingCart />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton color="secondary" size="small" onClick={this.props.onBookmark}>
                    <Share />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </BottomDrawer >
  }
}

Gallery.propsTypes = {
  visible: PropTypes.bool.isRequired,
  project: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onBuy: PropTypes.func,
  onBookmark: PropTypes.func,
}

Gallery.defaultProps = {
  onOpen: () => { console.log('onOpen') },
  onClose: () => { console.log('onClose') },
  onBuy: () => { console.log('onBuy') },
  onBookmark: () => { console.log('onBookmark') },
}

export default withStyles(styles)(Gallery);