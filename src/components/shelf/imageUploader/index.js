import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { BlockPicker } from 'react-color';

import { AddCircleRounded, CloseRounded } from '@material-ui/icons';

import styles from './styles';

class ImageUploader extends Component {
  constructor() {
    super();

    this.state = {
      url: null,
      error: null,
      visible: true,
    }
    this.hiddenRef = React.createRef();
  }

  onUpload = () => {
    this.hiddenRef.current.click();
  }

  onChange = (e) => {
    if (!e.target.files[0]) return;
    let url = URL.createObjectURL(e.target.files[0]);
    return this.setState({ url, visible: true }, () => {
      console.log(this.state)
    });
  }

  onToggle = () => {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    let { classes } = this.props;
    if (!this.props.visible) return null;

    return <Grid container spacing={2}>
      {/* Button */}
      <Grid item>
        <IconButton onClick={this.onUpload}>
          <AddCircleRounded style={{ color: this.props.color }} />
        </IconButton>
      </Grid>
      {/* Hidden input */}
      <input
        type="file"
        ref={this.hiddenRef}
        style={{ display: "none" }}
        onChange={this.onChange}
      />
      {/* Confirmation dialog */}
      <Dialog
        open={this.state.visible}
        onClose={this.onToggle}
        fullScreen={this.props.fullWidth}
      >
        <DialogTitle>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={8}>
              <Typography variant="h3">Image Uploader</Typography>
            </Grid>
            <Grid item xs={4}>
              <Grid container justify="flex-end" spacing={2}>
                <Grid item>
                  <IconButton color="secondary" size="small" onClick={this.onToggle}>
                    <CloseRounded />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>You can choose a major color to present the product.</Typography>
            </Grid>
            <Grid item xs={12}>
              {this.state.error ? <Typography color="primary">{this.state.error}</Typography> : null}
            </Grid>
            <Grid item xs={12} md={8}>
              <img width="100%" height="auto" alt={this.state.url} src={this.state.url} />
            </Grid>
            <Grid item xs={12} md={4}>
              <BlockPicker
                triangle="hide"
                width="100%"
                colors={['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C']}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onToggle} color="primary">
            <Typography>Bạn cần sự giúp đỡ ?</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  }
}

ImageUploader.defaultProps = {
  onChange: () => { },
  visible: false,
  color: '#ffffff',
  fullWidth: false
}

ImageUploader.propTypes = {
  onChange: PropTypes.func,
  visible: PropTypes.bool,
  fullWidth: PropTypes.bool,
  color: PropTypes.string,
}

export default withStyles(styles)(ImageUploader);