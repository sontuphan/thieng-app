import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BlockPicker } from 'react-color';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Switch from '@material-ui/core/Switch';

import { DeleteRounded, CloseRounded } from '@material-ui/icons';

import styles from './styles';
import utils from 'helpers/utils';

const DEFAULT_STATE = {
  isColor: false,
  url: null,
  colors: null,
  color: null,
}


class ImageEditorDialog extends Component {
  constructor() {
    super();

    this.state = { ...DEFAULT_STATE }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.visible !== this.props.visible) {
      if (this.props.visible)
        return this.setState({
          url: this.props.url,
          color: this.props.color,
          isColor: Boolean(this.props.color),
        });
      return this.setState({ ...DEFAULT_STATE });
    }
    if (prevState.url !== this.state.url && this.state.url) {
      utils.extractImageColors(this.state.url).then(palette => {
        let colors = [palette.DarkVibrant.hex, palette.Vibrant.hex, palette.LightVibrant.hex, palette.DarkMuted.hex, palette.Muted.hex, palette.LightMuted.hex]
        let color = colors[0];
        if (this.props.color) {
          color = this.props.color;
          if (!colors.includes(this.props.color)) {
            colors.push(color);
          }
        }
        this.setState({ color, colors });
      }).catch(er => console.error(er));
    }
  }

  onChange = () => {
    this.props.onSave({
      url: this.state.url,
      color: this.state.isColor ? this.state.color : null,
    });
  }

  onToogle = () => {
    this.setState({
      isColor: !this.state.isColor,
    });
  }

  onColor = (value) => {
    this.setState({ color: value.hex });
  }

  render() {
    let { classes } = this.props;

    return <Dialog maxWidth="md" open={this.props.visible} onClose={this.props.onClose} >
      <DialogTitle>
        <Grid container spacing={2} alignItems="center" className={classes.noWrap}>
          <Grid item className={classes.stretch}>
            <Typography variant="h3">Image Uploader</Typography>
          </Grid>
          <Grid item>
            <IconButton color="secondary" size="small" onClick={this.props.onClose}>
              <CloseRounded />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <img width="100%" height="auto" alt={this.state.url} src={this.state.url} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container className={classes.noWrap} alignItems="center" spacing={2}>
                  <Grid item className={classes.stretch}>
                    <Typography>Enable theme color</Typography>
                  </Grid>
                  <Grid item>
                    <Switch
                      checked={this.state.isColor}
                      onChange={this.onToogle}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className={this.state.isColor ? null : classes.disabled}>
                <BlockPicker
                  triangle="hide"
                  width="100%"
                  color={this.state.color || '#ffffff'}
                  colors={this.state.colors || ['#ffffff']}
                  onChange={this.onColor}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container className={classes.action} justify="flex-end" spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={this.onChange}
            >
              <Typography>OK</Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.props.onDelete}
              startIcon={<DeleteRounded />}
            >
              <Typography>Delete</Typography>
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  }
}

ImageEditorDialog.defaultProps = {
  visible: false,
  onClose: () => { },
  onSave: () => { },
  onDelete: () => { },
}

ImageEditorDialog.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  url: PropTypes.string,
  color: PropTypes.string,
}

export default withStyles(styles)(ImageEditorDialog);