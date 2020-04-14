import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import styles from './styles';

const DEFAULT_DATA = {
  width: 12,
  justify: 'flex-start',
  alignItems: 'flex-start',
}


class ContainerTool extends Component {
  constructor() {
    super();

    this.state = {
      ...DEFAULT_DATA,
    }
  }

  componentDidMount() {
    this.setState(this.props.defaultData);
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.defaultData) !== JSON.stringify(this.props.defaultData)) {
      this.setState(this.props.defaultData);
    }
  }

  onWidth = (e, value) => {
    if (!value) return;
    this.setState({ width: value });
  }
  onJustify = (e) => {
    this.setState({ justify: e.target.value });
  }
  onAlign = (e) => {
    this.setState({ alignItems: e.target.value });
  }

  onOk = () => {
    this.props.onChange(this.state);
    this.onDefault();
  }

  onDefault = () => {
    this.setState({ ...DEFAULT_DATA });
  }

  render() {
    let { classes } = this.props;
    return <Grid container justify="center" spacing={2}>
      <Grid item xs={12}>
        <Popover
          open={this.props.visible}
          anchorEl={this.props.anchorEl}
          onClose={this.props.onClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
          transformOrigin={{ vertical: 'top', horizontal: 'center', }}
        >
          <List className={classes.list}>
            <ListItem>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h3">Container</Typography>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel color="secondary">Width</InputLabel>
                </Grid>
                <Grid item xs={12}>
                  <Slider
                    value={this.state.width}
                    onChange={this.onWidth}
                    step={1} min={0} max={12}
                    valueLabelDisplay="auto"
                    marks
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel color="secondary">Justify</InputLabel>
                </Grid>
                <Grid item xs={12}>
                  <Select
                    value={this.state.justify}
                    onChange={this.onJustify}
                    fullWidth
                  >
                    <MenuItem value={'flex-start'}>
                      <Typography>Start</Typography>
                    </MenuItem>
                    <MenuItem value={'flex-end'}>
                      <Typography>End</Typography>
                    </MenuItem>
                    <MenuItem value={'center'}>
                      <Typography>Center</Typography>
                    </MenuItem>
                    <MenuItem value={'space-between'}>
                      <Typography>Space Between</Typography>
                    </MenuItem>
                    <MenuItem value={'space-around'}>
                      <Typography>Space Around</Typography>
                    </MenuItem>
                    <MenuItem value={'space-evenly'}>
                      <Typography>Space Evenly</Typography>
                    </MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel color="secondary">Align</InputLabel>
                </Grid>
                <Grid item xs={12}>
                  <Select value={this.state.alignItems} onChange={this.onAlign} fullWidth>
                    <MenuItem value={'flex-start'}>
                      <Typography>Start</Typography>
                    </MenuItem>
                    <MenuItem value={'flex-end'}>
                      <Typography>End</Typography>
                    </MenuItem>
                    <MenuItem value={'center'}>
                      <Typography>Center</Typography>
                    </MenuItem>
                    <MenuItem value={'stretch'}>
                      <Typography>Stretch</Typography>
                    </MenuItem>
                    <MenuItem value={'baseline'}>
                      <Typography>Baseline</Typography>
                    </MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2} justify="flex-end">
                    <Grid item>
                      <Button variant="contained" color="primary" onClick={this.onOk}>
                        <Typography>OK</Typography>
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button onClick={this.onDefault}>
                        <Typography>Default</Typography>
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </Popover>
      </Grid>
    </Grid>
  }
}

ContainerTool.defaultProps = {
  visible: false,
  defaultData: { ...DEFAULT_DATA },
  onChange: () => { },
  onClose: () => { },
}

ContainerTool.propTypes = {
  visible: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  anchorEl: PropTypes.object,
  defaultData: PropTypes.object,
}

export default withStyles(styles)(ContainerTool);