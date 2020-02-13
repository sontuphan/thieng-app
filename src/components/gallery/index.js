import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import { Close, ShoppingCart, Bookmark } from '@material-ui/icons';

import styles from './styles';
import Item from './item';
import Drain from 'components/drain';

class Gallery extends Component {
  constructor() {
    super();

    this.state = {
      likes: '12.853',
      products: 32,
      code: null,
      projects: []
    }
  }

  render = () => {
    let { classes } = this.props;

    return <Dialog
      open={this.props.visible}
      onClose={this.props.onClose}
      fullScreen
    >
      <DialogTitle className={classes.padding}>
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
                  <Bookmark />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton color="secondary" size="small" onClick={this.props.onClose}>
                  <Close />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12}>
            <Item project={this.props.project} />
          </Grid>
          <Grid item xs={12}>
            <Drain />
          </Grid>
          {this.props.dialogContent}
          <Grid item xs={12}>
            <Drain small />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  }
}

Gallery.propTypes = {
  visible: PropTypes.bool.isRequired,
  project: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  dialogContent: PropTypes.object,
  onBuy: PropTypes.func,
  onBookmark: PropTypes.func,
}

export default withStyles(styles)(Gallery);