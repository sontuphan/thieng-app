import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BlockPicker } from 'react-color';
import isEqual from 'react-fast-compare';

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

import { CloseRounded } from '@material-ui/icons';

import styles from './styles';
import utils from 'helpers/utils';

const DEFAULT_STATE = {
  isColor: false,
  source: null,
  colors: null,
  color: null,
}


class EditorDialog extends Component {
  constructor() {
    super();

    this.state = { ...DEFAULT_STATE }
  }

  componentDidUpdate(prevProps, prevState) {
    const { visible, file: { source, metadata } } = this.props;
    if (!isEqual(prevProps.visible, visible) && visible) {
      this.setState({
        source,
        color: metadata && metadata.color,
        isColor: Boolean(metadata && metadata.color),
      });
    }
    if (!isEqual(prevProps.visible, visible) && !visible) {
      this.setState({ ...DEFAULT_STATE });
    }
    if (prevState.source !== this.state.source && this.state.source) {
      utils.extractImageColors(source).then(palette => {
        let colors = [
          palette.DarkVibrant.hex, palette.Vibrant.hex, palette.LightVibrant.hex,
          palette.DarkMuted.hex, palette.Muted.hex, palette.LightMuted.hex
        ]
        let color = colors[0];
        if (this.props.color && !colors.includes(metadata.color)) {
          colors.push(metadata.color);
        }
        return this.setState({ color, colors });
      }).catch(console.error);
    }
  }

  onChange = () => {
    const { file } = this.props;
    const { isColor, color, source } = this.state;
    file.source = source;
    file.metadata = { color: isColor ? color : null };
    return this.props.onSave(file);
  }

  onToggle = () => {
    return this.setState({
      isColor: !this.state.isColor,
    });
  }

  onColor = (value) => {
    return this.setState({ color: value.hex });
  }

  render() {
    const { classes } = this.props;

    return <Dialog maxWidth="md" open={this.props.visible} onClose={this.props.onClose} >
      <DialogTitle>
        <Grid container spacing={2} alignItems="center" className={classes.noWrap}>
          <Grid item className={classes.stretch}>
            <Typography variant="h3">Chỉnh sửa ảnh</Typography>
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
            <img width="100%" height="auto" alt={this.state.source} src={this.state.source} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container className={classes.noWrap} alignItems="center" spacing={2}>
                  <Grid item className={classes.stretch}>
                    <Typography>Màu sắc sản phẩm</Typography>
                  </Grid>
                  <Grid item>
                    <Switch
                      checked={this.state.isColor}
                      onChange={this.onToggle}
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
              <Typography>Xong</Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.onClose}
            >
              <Typography>Hủy</Typography>
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  }
}

EditorDialog.defaultProps = {
  visible: false,
  file: {
    name: null,
    type: null,
    source: null,
    userId: null,
    metadata: {
      color: null
    },
  },
  onClose: () => { },
  onSave: () => { },
}

EditorDialog.propTypes = {
  visible: PropTypes.bool,
  file: PropTypes.object,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
}

export default withStyles(styles)(EditorDialog);